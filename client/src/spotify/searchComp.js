import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'

//contexts
import { SpotifyTokenContext } from '../contexts/spotifyTokenContext';

//styles
import SearchStyles from './styles/searchStyles'

//material ui

const SearchComp = (props) => {
    //styles
    const classes = SearchStyles();

    //props
    const { closeSearchDrawer, playTrack } = props;
    //contexts
    const
    [spotifyToken, setSpotifyToken] = useContext(SpotifyTokenContext);

    //states
    const
    [searchText, setSearchText] = useState(''),
    [searchResult, setSearchResult] = useState([]);

    //life cycles
    useEffect(()=> {
        if(!searchText) return  setSearchText('');
        setSearchResult(undefined)
        let cancel = false;
        const config={
            method: 'get',
            url: `https://api.spotify.com/v1/search?type=track&market=IN&q=${searchText}`,
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${spotifyToken}`,
            }
        }
        axios(config).then((res)=> {
            if(cancel) return; //this will only send axios request when typing is pauses/stopped
            console.log(res.data.tracks.items)
            setSearchResult(
                res.data.tracks.items.map(track=> {
                    const smallestImg = track.album.images.reduce( //find the smallest image
                        (smallest, img)=> {
                            if(img.height < smallest.height) return img;
                            return smallest;
                        },
                        track.album.images[0]
                    )

                    return{
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestImg
                    }
                })
            )
            console.log(searchResult)
        })
        .catch(err=> {
            console.log(err)
        })
        // spotifyApi.searchTracks(searchText).then(res=> {
        //     if(cancel) return;
        // })
        return ()=> cancel = true;
    }, [searchText])

    //functions
    const
    displayResults = ()=> {
        let array = [];
        if(searchResult){
            console.log(searchResult)
            searchResult.map(item=> {
                array.push(
                    <div 
                    className={classes.track} 
                    key={item.albumUrl.url}
                    onClick={()=> {
                        playTrack(item.uri, item.title)
                        setSearchText('')
                        closeSearchDrawer()
                        // hideSpotify()
                    }}>
                        <span>
                            <img 
                            src={item.albumUrl.url} 
                            className={classes.trackImg}
                            />
                        </span>
                        <div className={classes.trackInfo}>
                            <span className={classes.trackTitle}> {item.title} </span>
                            <span className={classes.trackArtist}> {item.artist} </span>
                        </div>
                    </div>
                )
            })
            return array
        }
    }


    return (
        <div className={classes.searchComp}>
            <span className={classes.searchCompHeader}>Search Tracks </span>
            <div className={classes.searchBar}>
                <input 
                placeholder='Type Here'
                onChange = {evt=> setSearchText(evt.target.value)}
                className={classes.searchBox}
                autoFocus
                />
            </div>
            <div className={classes.searchResults}>
                {displayResults()}
            </div>
        </div>
    );
};

export default SearchComp;