import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Config from '../../config.json'
const UseAuth = (code) => {
    const
    [accessToken, setAccessToken] = useState(),
    [refreshToken, setRefreshToken] = useState(),
    [expiresIn, setExpiresIn] = useState();
    let redirectUri, backendRoute;

    if(process.env.NODE_ENV === "development"){
        redirectUri = Config.localhost;
        backendRoute = Config.localBackend;
    }else{
        redirectUri = Config.productionHost;
        backendRoute = Config.productionBackend
    }

    //get acces, refresh token
    useEffect(()=> {
        axios.post(`${backendRoute}/spotify/login`, {
            data:{
                code,
                redirectUri : redirectUri
            }
        }).then(res=> {
            console.log(res.data);
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            

            window.localStorage.setItem('spotifyToken', res.data.accessToken)
            window.localStorage.setItem('spotifyRefreshToken', res.data.refreshToken)
            window.localStorage.setItem('spotifyExpiresIn', res.data.expiresIn)
            window.history.pushState({}, null, '/');
        }).catch(err=> {
            console.log('spo err');
            console.log(err);
            console.log(code);
            console.log('spo err');
        })
    }, [code])

    //refresh token after expiry
    // useEffect(()=> {
    //     if(!refreshToken || !expiresIn) return;

    //     const timeout = setInterval(()=> {
    //         axios.post('https://us-central1-chatapp-8a77f.cloudfunctions.net/user/spotify/refresh', {
    //             refreshToken
    //         }).then(res=> {
    //             setAccessToken(res.data.accessToken);
    //             setExpiresIn(res.data.expiresIn);
                
    //             window.localStorage.setItem('spotifyToken', JSON.stringify(res.data.accessToken))
    //         }).catch(err=> {
    //             console.log(err);
    //             window.location = '/spotify';
    //         })
    //     }, (expiresIn - 60) * 1000)

    //     return ()=> clearInterval(timeout);
    // }, [refreshToken, expiresIn])

    return accessToken;
};

export default UseAuth;