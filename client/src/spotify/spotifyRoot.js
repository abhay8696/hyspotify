import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Config from '../config.json'
//contexts
import { SpotifyTokenContext } from '../contexts/spotifyTokenContext';
import { UserDataContext } from '../contexts/userDataContext';
import { MiniPlayer2Context } from '../contexts/miniPlayer2Context';
//components
import SpotifyNav from './spotifyNav';
import MusicBox from './musicBox';
import MiniPlayer from './miniPlayer';
import ChatList from '../chats/chatList';
//material ui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
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
    [ miniPlayer2, setMiniPlayer2 ] = useContext(MiniPlayer2Context)

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
    toggleChatListDrawer = ()=> setChatDrawerOn(!chatDrawerOn);


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
                <>
                <MusicBox userData={userData}/>
                { !miniPlayer2 ? <MiniPlayer /> : null } 
                </> 
                : null
            }
        </div>
    );
};

export default SpotifyRoot;