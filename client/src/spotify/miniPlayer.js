import React, { useEffect, useState, useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'

//backend APIs
import { pauseSongAPI } from '../api/serverRequests'
//context
import { SpotifyTokenContext } from '../contexts/spotifyTokenContext';
import { SpotifyTrackUriContext } from '../contexts/spotifyTrackUriContext';
import { PlayingTrackContext } from '../contexts/playingTrackContext';
import { UserDataContext } from '../contexts/userDataContext';
import { ChattingWithContext } from '../contexts/chattingWithContext';

//styles
import MiniPlayerStyles from './styles/miniPlayerStyles';

//material ui
import { Snackbar, Paper } from '@mui/material';
const MiniPlayer = (props) => {
    //styles
    const classes = MiniPlayerStyles();
    //states
    const 
    [ displayNotification, setDisplayNotification ] = useState(false),
    [trackNotificationOpen, setTrackNotificationOpen] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      }),
    [ currentPlaying, setCurrentPlaying ] = useState('');

    //variables
    const { vertical, horizontal, open } = trackNotificationOpen;
    const styless = {
        // bgColor: 'blue'
        activeColor: 'red'
    }

    //contexts
    const
    [ userData, setUserData] = useContext(UserDataContext),
    [ chattingWith, setChattingWith ] = useContext(ChattingWithContext),
    [ spotifyToken, setSpotifyToken] = useContext(SpotifyTokenContext),
    [ spotifyTrackUri, setSpotifyTrackUri] = useContext(SpotifyTrackUriContext),
    [ playingTrack, setPlayingTrack ] = useContext(PlayingTrackContext);

    //life cycle
    useEffect(()=> {
        // audio.pause();
        if(spotifyTrackUri && spotifyTrackUri.data) setCurrentPlaying(spotifyTrackUri.data.preview_url)
        var audio = new Audio(currentPlaying);
        audio.play();
    }, [spotifyTrackUri])

    useEffect(()=> {
        setPlayingTrack(false)

        return ()=> {
            console.log("EXITING MINIPLAYERRRRRRR")
            setPlayingTrack(false)
        }
    }, [])
    // useEffect(()=> {
    //     if(chattingWith) pauseSongAPI({userData, chattingWith, playingTrack});
    // }, [playingTrack])

    //functions
    const 
    closeTrackNotification = (event, reason) => {
        setTrackNotificationOpen({ ...trackNotificationOpen, open: false });
    },
    handleTrackNotification = () => {
        setTrackNotificationOpen({
            open: true,
            vertical: 'top',
            horizontal: 'center',
          });
    },
    currentTrack = (uri)=> {
        return (
            <SpotifyPlayer 
            // anchorOrigin={{ vertical, horizontal }}
            token = {spotifyToken}
            showSaveIcon
            play={playingTrack}
            callback={state=> {
                console.log(state)
                if(!state.isPlaying) setPlayingTrack(false)
                if(state.isPlaying) setPlayingTrack(true)
            }}
            uris = {uri ? [uri] : []}
            />
        )
    },
    showSnackbar = (trackName)=> {
        console.log(playingTrack)
        return (
        <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={3000}
                onClose={closeTrackNotification}
                key={vertical + horizontal}
            >
            <Paper elevation={10} className={classes.playNotificaton}>
                Playing <span className={classes.playingSongName}>{trackName}</span>
            </Paper>
        </Snackbar>
        )
    }

    return (
        <div className={classes.miniPlayer}>
            
        </div>
    );
};

export default MiniPlayer;

/*return (
        <div 
        className={classes.miniPlayer} 
        >
            <SpotifyPlayer 
            // anchorOrigin={{ vertical, horizontal }}
            token = {spotifyToken}
            showSaveIcon
            play={playingTrack}
            callback={state=> {
                console.log(state)
                if(!state.isPlaying) setPlayingTrack(false)
                if(state.isPlaying) setPlayingTrack(true)
            }}
            uris = {spotifyTrackUri.uri ? [spotifyTrackUri.uri] : []}
            />
            {spotifyTrackUri.uri && playingTrack? showSnackbar(spotifyTrackUri.trackName) : null}
        </div>
    ); 
    


    //life cycle
    useEffect(()=> {
        // if(spotifyTrackUri.uri){
        //     handleTrackNotification()
        //     setPlayingTrack(true)
        // }else{
        //     setPlayingTrack(false)
        // }
*/