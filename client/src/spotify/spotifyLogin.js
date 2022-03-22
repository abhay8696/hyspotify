import React, { useContext, useState } from 'react';
import UseAuth from './hooks/useAuth';
import Config from '../config.json'

import { SpotifyTokenContext } from '../contexts/spotifyTokenContext';
import { Button } from '@mui/material'
//components
import SpotifyNav from './spotifyNav';
import LoadingComp from '../loadingComp';
//styles
import LoginStyles from './loginStyles'

let clientID, redirectUri;
//

const SpotifyLogin = () => {
    //styles
    const classes = LoginStyles();

    //variables
    clientID = Config.spotifyclientID
    process.env.NODE_ENV === "development" ? 
        redirectUri = Config.localhost : redirectUri = Config.productionHost

    const authURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-private%20user-read-email%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20playlist-read-private%20playlist-read-private%20playlist-modify-public%20playlist-read-collaborative%20user-top-read%20user-read-recently-played%20user-read-playback-position%20app-remote-control`;
    const code = new URLSearchParams(window.location.search).get('code');
    let accessToken ;
    
    //contexts
    const 
    [spotifytoken, setSpotifyToken] = useContext(SpotifyTokenContext);
    //states
    const [ clicked, setClicked ] = useState(false)


    if(code) accessToken= UseAuth(code);
    if(accessToken) {
        setSpotifyToken(accessToken);
        console.log(accessToken)
    }else {
        console.log('no access token');
        // window.localStorage.clear();
    }

    return (
        <div className={classes.spotifyLogin}>
            <SpotifyNav loggedOut={true}/>
            <div className={classes.pageBody}>
            {
            !code ?
            <>
            <div className={classes.loginButton} onClick={()=> setClicked(true)}>
                <a href={authURL}>
                <span className={classes.loginButt}>Login With Spotify</span>
                </a>
            </div>
            <div 
            className={classes.description}
            >
                {clicked ? 
                    <p className={classes.takingToSpotify}>
                    <LoadingComp description="Taking you to spotify's login page..."/> 
                    </p> 
                : null}
                <p>Chat with your friends and listen spotfiy togehter</p>
            </div>
            </>
                :
                <LoadingComp description="fetching data..."/> 
            }
            </div>
        </div>
    );
};

export default SpotifyLogin;