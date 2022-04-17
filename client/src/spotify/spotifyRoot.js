import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Config from '../config.json'
//contexts
import { SpotifyTokenContext } from '../contexts/spotifyTokenContext';
import { UserDataContext } from '../contexts/userDataContext';
import { MiniPlayer2Context } from '../contexts/miniPlayer2Context';
import { SpotifyTrackUriContext } from '../contexts/spotifyTrackUriContext';
//components
import SpotifyNav from './spotifyNav';
import MusicBox from './musicBox';
import MiniPlayer from './miniPlayer';
import ChatList from '../chats/chatList';
import PlayBox from './playBox';
//material ui
import Drawer from '@mui/material/Drawer';

//styles
import SpotifyStyles from './styles/spotifyStyles'

let backendRoute;
if(process.env.NODE_ENV === "development"){
    backendRoute = Config.localBackend
}else backendRoute = Config.productionBackend

const SpotifyRoot = (props) => {

    const classes = SpotifyStyles();
    let player;
    
    //contexts
    const
    [spotifyToken, setSpotifyToken] = useContext(SpotifyTokenContext),
    [userData, setUserData] = useContext(UserDataContext),
    [ miniPlayer2, setMiniPlayer2 ] = useContext(MiniPlayer2Context),
    [spotifyTrackUri, setSpotifyTrackUri] = useContext(SpotifyTrackUriContext)

    //props
    const { db } = props

    //states
    const
    [ chatDrawerOn, setChatDrawerOn ] = useState(false);


    //life cycle methods
    useEffect(()=> {
        fetchUserData();
    }, [])

    useEffect(()=> {
        if(userData) {
            console.log('registering!!!!!!!!!!')
            axios.post(`${backendRoute}/chats/registerUser`, userData)
            .then(res=> console.log(res.data))
            .catch(err=> console.log(err))
        }
    }, [userData])

    //functions
    const 
    fetchUserData = ()=> {
        const config={
            method: 'get',
            url: "https://api.spotify.com/v1/me",
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${spotifyToken}`,
            }
        }
        axios(config).then((res)=> {
            // console.log(res.data);
            setUserData(res.data);
        })
        .catch(err=> {
            console.log(err)
            console.log(spotifyToken)
            setSpotifyToken(null)
            window.localStorage.clear()
            // window.location()
        })
    },
    toggleChatListDrawer = ()=> setChatDrawerOn(!chatDrawerOn),
    miniPlayerFunc = ()=> {
        // !miniPlayer2 ? <MiniPlayer /> : null 
        if(userData.product === 'open') return;
        if(!miniPlayer2) return <MiniPlayer/> 
    }


    return (
        <div className={classes.spotifyRoot} >
            <SpotifyNav userData={userData} toggleChatListDrawer={toggleChatListDrawer}/> 
            <Drawer
                anchor={'right'}
                open={chatDrawerOn}
                onClose={()=> setChatDrawerOn(false)}
                className = {classes.chatListDrawer}
            >
                    <ChatList db={db} 
                    toggleChatListDrawer={toggleChatListDrawer}
                    />
            </Drawer>
            {
            userData ?
            <div className={classes.spotifyBody}>
                <div className={classes.body1}>
                    <MusicBox userData={userData}/>
                    {/* {miniPlayerFunc()}  */}
                </div>
                <PlayBox/>
                <div className={classes.body3}>
                    <ChatList db={db} />
                </div>
            </div> 
            : null
            }
        </div>
    );
};

export default SpotifyRoot;