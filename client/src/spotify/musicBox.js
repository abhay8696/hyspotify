import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
//server APIs
import { playSharedSongAPI } from '../api/serverRequests';
//components
import SearchComp from './searchComp';
import LoadingComp from '../loadingComp';
//contexts
import { SpotifyTokenContext } from '../contexts/spotifyTokenContext';
import { SpotifyTrackUriContext } from '../contexts/spotifyTrackUriContext';
import { UserDataContext } from '../contexts/userDataContext';
import { PlayingTrackContext } from '../contexts/playingTrackContext';
import { ChattingWithContext } from '../contexts/chattingWithContext';

//material ui
import MusicBoxStyles from './styles/musicboxStyles'
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import { Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

const MusicBox = (props) => {
    //styles
    const classes = MusicBoxStyles();

    //props
    const { insideChatBox, closeSongDrawer, isSharingSong } = props;

    //contexts
    const
    [spotifyToken, setSpotifyToken] = useContext(SpotifyTokenContext),
    [userData, setUserData] = useContext(UserDataContext),
    [ chattingWith, setChattingWith ] = useContext(ChattingWithContext),
    [spotifyTrackUri, setSpotifyTrackUri] = useContext(SpotifyTrackUriContext),
    [ playingTrack, setPlayingTrack ] = useContext(PlayingTrackContext);

    //states
    const
    [ top50, setTop50 ] = useState(),
    [ myTopTracks, setMyTopTracks ] = useState(),
    [ newReleases, setNewReleases ] = useState(),
    [ searchDrawer, setSearchDrawer ] = useState(false),
    [ loadingTop50, setLoadingTop50 ] = useState(true),
    [ loadingTopTracks, setLoadingTopTracks ] = useState(true);

    //life cycle methods
    useEffect(()=> {
        fetchTop50();
        fetchMyTopTracks();
        fetchNewReleases();
    }, [userData])

    //functions
    const
    playTrack = (uri, trackName)=> {
        if(isSharingSong){
            playSharedSongAPI({ 
                myID: userData.id, 
                myName: userData.display_name, 
                frndID: chattingWith.id, 
                frndName: chattingWith.display_name, 
                uri, 
                trackName 
            });
        }else{
            setSpotifyTrackUri({uri, trackName, isSharingSong});
        }
        window.localStorage.setItem('last played track', uri);
        if(closeSongDrawer) closeSongDrawer()
    },
    fetchTop50 = ()=> {
        const config={
            method: 'get',
            url: "https://api.spotify.com/v1/playlists/37i9dQZEVXbLZ52XmnySJg?market=IN",
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${spotifyToken}`,
            }
        }
        axios(config).then((res)=> {
            setTop50(res.data.tracks.items);
        })
        .catch(err=> {
            console.log(err)
        })
    },
    fetchMyTopTracks = ()=> {
        const config={
            method: 'get',
            url: "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20",
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${spotifyToken}`,
            }
        }
        axios(config).then((res)=> {
            if(res.data.items) setMyTopTracks(res.data.items)
        })
        .catch(err=> {
            console.log(err)
        })
    },
    fetchNewReleases = ()=> {
        const config={
            method: 'get',
            url: "https://api.spotify.com/v1/browse/new-releases?country=IN",
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${spotifyToken}`,
            }
        }
        axios(config).then((res)=> {
            console.log('new Releases')
            setNewReleases(res.data.albums.items)
            console.log('new Releases')
        })
        .catch(err=> {
            console.log(err)
        })
    },
    fetchAlbumTracks = (id)=> {
        const config={
            method: 'get',
            url: `https://api.spotify.com/v1/albums/${id}/tracks`,
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${spotifyToken}`,
            }
        }
        axios(config).then((res)=> {
            console.log('new ALBUM')
            console.log(res.data)
            console.log('new ALBUM')
        })
        .catch(err=> {
            console.log(err)
        })
    },
    displaymyTopTracks = ()=> {
        console.log(myTopTracks)
        let array = [];
        if(myTopTracks){
            let trackName;
            myTopTracks.map(track=> {
                let shortName = `${track.name} = ${track.name.length}`;
                if(shortName.length > 25){
                    //reduce the length of track name to save space
                    trackName = shortName.substr(0,25).concat('...')
                }else( trackName = track.name)
                array.push(
                    <div 
                    className={classes.topTrack} key={track.id}
                    onClick={()=> playTrack(track.uri, track.name)}
                    >
                        <img 
                        src={track.album.images[1].url} 
                        key={track.id}
                        className={classes.topTrackImg}
                        />
                        <div className={classes.topTrackInfo}>
                            <span className={classes.topTrackName}> {trackName} </span>
                            <span className={classes.topTrackArtist}> {track.artists[0].name} </span>
                        </div>
                    </div>
                )
            })
        }
        if(array.length === 0) array.push( 
            <p 
            style={{marginLeft: '8px'}}
            className={classes.topTrackArtist}>Songs Frequently Heard By You Will Be Displyed Here</p>
            )
        return array;
    },
    displayTop50 = ()=> {
        if(top50){
            let array = [], trackName;
            top50.map(item=> {
                let shortName = `${item.track.name} = ${item.track.name.length}`;
                if(shortName.length > 25){
                    //reduce the length of track name to save space
                    trackName = shortName.substr(0,25).concat('...')
                }else( trackName = item.track.name)
                array.push(
                    <div 
                    className={classes.topTrack} key={item.track.id}
                    onClick={()=> playTrack(item.track.uri, item.track.name)}
                    >
                        <img 
                        src={item.track.album.images[1].url} 
                        key={item.track.id}
                        className={classes.topTrackImg}
                        />
                        <div className={classes.topTrackInfo}>
                            <span className={classes.topTrackName}> {trackName} </span>
                            <span className={classes.topTrackArtist}> {item.track.artists[0].name} </span>
                        </div>
                    </div>
                )
            })
            return array;
        }
    },
    displayNewReleases = ()=> {
        if(newReleases){
            let array = [], albumName;
            newReleases.map(item=> {
                let shortName = `${item.name} = ${item.name.length}`;
                if(shortName.length > 25){
                    //reduce the length of track name to save space
                    albumName = shortName.substr(0,25).concat('...')
                }else( albumName = item.name)
                array.push(
                    <div 
                    className={classes.topTrack} key={item.id}
                    onClick={()=> fetchAlbumTracks(item.id)}
                    >
                        <img 
                        src={item.images[0].url} 
                        key={item.id}
                        className={classes.topTrackImg}
                        />
                        <div className={classes.topTrackInfo}>
                            <span className={classes.topTrackName}> {albumName} </span>
                            <span className={classes.topTrackArtist}> {item.artists[0].name} </span>
                        </div>
                    </div>
                )
            })
            return array;
        }
    },
    closeSearchDrawer = ()=> {
        setSearchDrawer(false)
    };

    return (
        <div className={classes.musicBox}>
            <div className={classes.searchBar}>
                <span 
                className={classes.searchBox}
                onClick={()=> setSearchDrawer(true)}
                >
                    Search Tracks...
                    <SearchIcon />
                </span>
                <Drawer
                    anchor={'top'}
                    open={searchDrawer}
                    onClose={()=> closeSearchDrawer()}
                    className={classes.searchDrawer}
                >
                    <SearchComp 
                    closeSearchDrawer={closeSearchDrawer}
                    playTrack={playTrack}
                    />
                    <div className={classes.closeSearchDiv}>
                        <span 
                        onClick={()=> closeSearchDrawer()}
                        className={classes.closeSearchButton}
                        >
                            CLOSE<CancelIcon />
                        </span>
                    </div>
                </Drawer>
            </div>
            <div className={classes.topTracksHeader}>Top 50 In India</div>
            <div className={classes.topTrackList}>
                {displayTop50()}
            </div>
            <div className={classes.topTracksHeader}>Frequently Played</div>
            <div className={classes.topTrackList}>
                {displaymyTopTracks()}
            </div>
            { !insideChatBox ?
            <>
            <div className={classes.topTracksHeader}>New Released Albums</div>
            <div className={classes.topTrackList}>
                {displayNewReleases()}
            </div>
            </>
            : null
            }
        </div>
    );
};

export default MusicBox;