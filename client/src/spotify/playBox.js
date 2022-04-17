import React, { useState, useContext, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
//contexts
import { UserDataContext } from '../contexts/userDataContext';
import { SpotifyTrackUriContext } from '../contexts/spotifyTrackUriContext';
//styles
import PlayBoxStyles from './styles/playBoxStyles'
import spotifyLogo from '../spotify-logo.svg'
//mui
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

const PlayBox = () => {
    //styles
    const classes = PlayBoxStyles();
    //states
    const
    [currentPlaying, setCurrentPlaying] = useState(),
    [isPlaying, setIsPlaying] = useState(false);
    //variable
    //contexts
    const
    [userData, setUserData] = useContext(UserDataContext),
    [spotifyTrackUri, setSpotifyTrackUri] = useContext(SpotifyTrackUriContext);
    //life cycle methods
    useEffect(()=> {
        if(spotifyTrackUri && spotifyTrackUri.data){
            setCurrentPlaying(spotifyTrackUri.data.preview_url);
        }
    }, [spotifyTrackUri])
    //functions
    const
    dispPauseButton = ()=> {return (
        <span 
        className={classes.playPauseButt}
        onClick={()=> setIsPlaying(false)}
        >
            <PauseCircleOutlineIcon/>
        </span>
    )},
    dispPlayButton = ()=> {return (
        <span 
        className={classes.playPauseButt}
        onClick={()=> setIsPlaying(true)}
        >
            <PlayCircleOutlineIcon/>
        </span>
    )},
    showCurrentTrack = ()=> {
        let imgSrc;
        if(spotifyTrackUri){
            if(spotifyTrackUri && spotifyTrackUri.data && spotifyTrackUri.data.album) imgSrc = spotifyTrackUri.data.album.images[0].url
            return (
                <div className={classes.currentTrackInfo}>
                    <img 
                        src={imgSrc} 
                        className={classes.currentSongImg}
                    />
                    <span>
                        {spotifyTrackUri.trackName}
                    </span>
                    
                </div>
            )
        }
    };

    return (
    <div className={classes.body2}>
        {
            !spotifyTrackUri.uri ? 
            <div className={classes.currentTrackInfo}>
                <img src={spotifyLogo} className={classes.currentSongImg}/>
                <span>Select A Track To Play</span>
            </div>
            :
            showCurrentTrack()
        }
        <div className={classes.reactAudioPlayer}>
            { spotifyTrackUri && spotifyTrackUri.data && spotifyTrackUri.data.album ?
            <img 
                src={spotifyTrackUri.data.album.images[0].url} 
                className={classes.imgReactAudioPlayer}
            />
            :null}
            <ReactAudioPlayer src={currentPlaying} autoPlay controls />
        </div>
        {
            spotifyTrackUri.uri && !currentPlaying ? <p className={classes.noPremium}>Preview Unavailable :(</p> : null
        // spotifyTrackUri.uri ?
            // currentPlaying ?
                
            // : <p className={classes.noPremium}>Preview Unavailable :(</p>
        // :null
        }
        {
            userData.product === 'open' ? 
            <div className={classes.noPremium}>
                * Unfortunately Spotify Allows Only Premiums Users To Listen Full Tracks Here! *
            </div>
            : null
        }
    </div>
    );
};

export default PlayBox;