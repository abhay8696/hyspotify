import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Config from '../config.json'
//components
import SpotifyNav from '../spotify/spotifyNav';
import SearchComp from './searchUser'
import ChatBox from './chatBox';
import LoadingComp from '../loadingComp';
//contexts
import { UserDataContext } from '../contexts/userDataContext';
import { ChattingWithContext } from '../contexts/chattingWithContext';
//styles
import ChatListStyles from './styles/chatListStyles';
//material ui
import Drawer from '@mui/material/Drawer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';

let backendRoute;
if(process.env.NODE_ENV === "development"){
    backendRoute = Config.localBackend
    console.log('development MODEEEEE')
}else {backendRoute = Config.productionBackend; 
    console.log('production MODEEEEE')
}

const ChatList = (props) => {
    //styles
    const classes = ChatListStyles();

    //props
    const { toggleChatListDrawer, db } = props

    //contexts
    const
    [userData, setUserData] = useContext(UserDataContext),
    [ chattingWith, setChattingWith ] = useContext(ChattingWithContext)

    //states
    const 
    [ allUsers, setAllUsers ] = useState(null),
    [ chatBoxOpen, setChatBoxOpen ] = useState(false);

    //life cycle methods
    useEffect(()=> {
        //get users
        fetchUsers();

        return ()=> {
            console.log("unmounting chatlist component")
            setAllUsers(null)
        }
    }, [])

    //functions
    const
    fetchUsers = ()=> {
        axios.get(`${backendRoute}/chats/allUsers`).then(res=> {
            setAllUsers(res.data)
            })
        .catch(err=> console.error(err))
    },
    openChatBox = (user)=> {
        setChatBoxOpen(true);
        setChattingWith(user);
    },
    closeChatBox = ()=> {
        setChattingWith(undefined);
        setChatBoxOpen(false);
    },
    displayAllUsers = ()=> {
        let array = [];
        if(allUsers){
            allUsers.map(user=> {
                let dp;
                if(user.images[0]){
                    dp = 
                    <img 
                    src={user.images[0].url}
                    className={classes.dp} 
                    />
                }else {
                    dp = <AccountCircle 
                    fontSize='large'
                    className={classes.dp} 
                    />
                }
                if(user.id !== userData.id){
                    array.push(
                        <div 
                        onClick={()=> openChatBox(user)} 
                        key={user.id}
                        className={classes.chatListItem}
                        >
                            {dp}
                            <span
                            className={classes.chatListName}
                            >
                                {user.display_name}
                            </span>
                        </div>
                    )
                }
            })
        }
        return array;
    }

    return (
        <div className={classes.chatList}>
            <div className={classes.chatListNav}>
                <SpotifyNav 
                toggleChatListDrawer={toggleChatListDrawer} 
                insideChatsList = {true}
                />
            </div>
            <p>HySpotify Users</p>
            { allUsers ? 
                displayAllUsers() 
                : 
                <LoadingComp description="Fetching Hyspotify Users"/> 
            }
            <Drawer
                anchor={'right'}
                open={chatBoxOpen}
                onClose={()=> closeChatBox()}
                className={classes.chatDrawer}
            >
                    <ChatBox 
                        toggleChatBox = {()=> closeChatBox()}
                        db = {db}
                    />
            </Drawer>
        </div>
    );
};

export default ChatList;