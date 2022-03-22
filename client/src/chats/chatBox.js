import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Config from '../config.json';
import { doc, onSnapshot, collection, query, orderBy, limit, where } from 'firebase/firestore';

//backend APIs
import { addMsgToMyDatabase, addMsgToFrndsDatabase, isSharingSongAPI, playSharedSongAPI } from '../api/serverRequests';
//components
import MusicBox from '../spotify/musicBox';
import SpotifyNav from '../spotify/spotifyNav';
import MiniPlayer2 from './miniPlayer2';
//contexts
import { UserDataContext } from '../contexts/userDataContext';
import { ChattingWithContext } from '../contexts/chattingWithContext';
import { PlayingTrackContext } from '../contexts/playingTrackContext';
import { SpotifyTrackUriContext } from '../contexts/spotifyTrackUriContext';
import { MiniPlayer2Context } from '../contexts/miniPlayer2Context';
//styles
import ChatBoxStyles from './styles/chatBoxStyles';
//material ui
import SendIcon from '@mui/icons-material/Send';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button'

let backendRoute;
if(process.env.NODE_ENV === "development"){
    backendRoute = Config.localBackend
    console.log('development MODE')
}else {backendRoute = Config.productionBackend; 
    console.log('production MODE')
}

const ChatBox = (props) => {
    //styles
    const classes = ChatBoxStyles();

    //contexts
    const 
    [userData, setUserData] = useContext(UserDataContext),
    [ chattingWith, setChattingWith ] = useContext(ChattingWithContext),
    [spotifyTrackUri, setSpotifyTrackUri] = useContext(SpotifyTrackUriContext),
    [ playingTrack, setPlayingTrack ] = useContext(PlayingTrackContext),
    [ miniPlayer2, setMiniPlayer2 ] = useContext(MiniPlayer2Context);

    //states
    const
    [ textMsg, setTextMsg ] = useState(''),
    [ msgBucket, setMsgBucket ] = useState([]),
    [ songDrawer, setSongDrawer ] = useState(false),
    [ isSharingSong, setIsSharingSong ] = useState(false),
    [ tempStyle, setTempStyle ] = useState({}),
    [ dailogOpen, setDailogOpen ] = useState(false);
    const dummy = useRef()
    //props
    const { toggleChatBox, db } = props;
    //variables
    const
    tempStyle1 = {
        paddingBottom : '6rem'
    },
    tempStyle2 = {
        paddingBottom : '3rem'
    };
    //life cycle methods
    useEffect(()=> {
        isSharingSongAPI({ 
            myID: userData.id, 
            myName: userData.display_name, 
            frndID: chattingWith.id,
            frndName: chattingWith.display_name, 
            isSharingSong:false, 
            songSharer: null
        })
        playSharedSongAPI({ 
            myID: userData.id, 
            myName: userData.display_name, 
            frndID: chattingWith.id,
            frndName: chattingWith.display_name, 
            uri: null, 
            trackName: null 
        })

        return ()=> {//return in useEffect[] executes when component is unmounted
            console.log("UNMOUNTING CHATBOX")
            setIsSharingSong(false)
            setMiniPlayer2(false)
            isSharingSongAPI({ 
                myID: userData.id, 
                myName: userData.display_name, 
                frndID: chattingWith.id,
                frndName: chattingWith.display_name, 
                isSharingSong:false, 
                songSharer: null
            })
            playSharedSongAPI({ 
                myID: userData.id, 
                myName: userData.display_name, 
                frndID: chattingWith.id,
                frndName: chattingWith.display_name, 
                uri: null, 
                trackName: null 
            })
        }
    }, [])
    useEffect(async ()=> {
        const myID = userData.id,
        frndName = chattingWith.display_name,
        frndID = chattingWith.id;

        if(db){
            // console.log('fetching messages from db...');
            let arr = [];
            
            const msgRef = query(collection(db, "users", myID, "chats", `${frndName}-${frndID}`, "messages"), orderBy("createdAt", 'desc'), limit(50))
            const sharingRef = query(
                doc(db, "users", myID, "chats", `${frndName}-${frndID}`)
                )

            const getMsgs = onSnapshot(msgRef, snaps=> {
                
                arr = []
                snaps.forEach(doc=> {
                    arr.push({...doc.data(), id: doc.id})
                })
                setMsgBucket(arr)
                if(dummy.current){
                    dummy.current.scrollIntoView({behavior: 'smooth'})
                }
            })

            const isSharingSongUpdate = onSnapshot(sharingRef, snaps=> {
                console.log('updating isSharing...')
                if(snaps.data()){
                    const { sharedUri, sharedTrackName, songSharer } = snaps.data();
                    if(songSharer === chattingWith.display_name && !sharedUri){
                        // setDailogOpen(true)
                        setIsSharingSong(true)
                    }
                    if(!snaps.data().isSharingSong){
                        setIsSharingSong(false)
                        setMiniPlayer2(false)
                    }
                    if(snaps.data().isSharingSong) setMiniPlayer2(true)
                    if(snaps.data().isSharingSong && sharedUri){
                        setSpotifyTrackUri({uri: sharedUri, trackName: sharedTrackName, isSharingSong});
                    }
                }
            })
        }
    },[db])
    useEffect(()=> {
    }, [msgBucket])
    useEffect(()=> {
        const myID = userData.id,
        frndName = chattingWith.display_name,
        frndID = chattingWith.id;
        let songSharer
        if(isSharingSong){
            setTempStyle(tempStyle1)
            songSharer = userData.display_name
        }else{
            setTempStyle({})
            songSharer = null
        }
    }, [isSharingSong])
    useEffect(()=> {
        if(dailogOpen){
            setTimeout(() => {
                setDailogOpen(false)
            }, 5000);
        }
    }, [dailogOpen])
    //functions
    const
    sendMsg = evt=> {
        evt.preventDefault();
        if (!textMsg.replace(/\s/g, '').length) {
            console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
          }else{
            console.log('sending msg to database...');
            const
            myID = userData.id,
            myName = userData.display_name,
            frndName = chattingWith.display_name,
            frndID = chattingWith.id;

            addMsgToMyDatabase(myID, frndName, frndID, textMsg)
            addMsgToFrndsDatabase(frndID, myName, myID, textMsg)
            setTextMsg('')
        }
    },
    displayMsgs = ()=> {
        let arr = [], timestamp, date, hrs = '', mins = '', class_name;
        if(msgBucket){
            msgBucket.map(msg=> {
                if(msg.createdAt){
                    date = new Date(msg.createdAt.seconds * 1000)
                    hrs = date.getHours()
                    mins = date.getMinutes()
                }
                timestamp = `${hrs} : ${mins}`;
                if(msg.from === 'me'){
                    arr.push(
                        <div key={msg.id} className={classes.myMsg}>
                            <span>{msg.msg}</span>
                            <span className={classes.time}>{timestamp}</span>
                        </div>
                    )
                }else{
                    arr.push(
                        <div key={msg.id} className={classes.frndMsg}>
                            <span>{msg.msg}</span>
                            <span className={classes.time}>{timestamp}</span>
                        </div>
                    )
                }
            })
            return (arr);
        }
    },
    isSharingSongFunc = (val)=> {
        val ? setMiniPlayer2(true) : setMiniPlayer2(false)

        setIsSharingSong(val)
        let songSharer
        if(val){
            songSharer = userData.display_name
        }else{
            songSharer = null
        }
        // console.log('sending status to backend...');
        isSharingSongAPI({ 
            myID: userData.id, 
            myName: userData.display_name, 
            frndID: chattingWith.id,
            frndName: chattingWith.display_name, 
            isSharingSong:val, 
            songSharer: songSharer 
        })
    },
    dailogButton1 = () => {
        
      setDailogOpen(false);
    },
    dailogButton2 = () => {
      setDailogOpen(false);
      isSharingSongAPI({ 
        myID: userData.id, 
        myName: userData.display_name, 
        frndID: chattingWith.id,
        frndName: chattingWith.display_name, 
        isSharingSong:false, 
        songSharer: null 
    })
    };
    
    return (
        <>
        <div className={classes.chatBox}>
            <SpotifyNav 
            toggleChatBox={toggleChatBox} 
            insideChatBox = {true}
            className={classes.navbar}
            />
            <div className={classes.msgArea} style={tempStyle}>
                <div className={classes.songSwitch}>
                    <div>
                    <span onClick={()=> setDailogOpen(true)}>Listen Songs Together</span>
                    <Switch color="warning" onClick={()=> isSharingSongFunc(!isSharingSong)} checked={isSharingSong}/>
                    </div>
                    { isSharingSong ? 
                        <QueueMusicIcon 
                        onClick = {()=> setSongDrawer(!songDrawer)}
                        className = {classes.musicIcon}
                        fontSize='large'/> 
                    : null}
                    
                </div>
                <div className={classes.msgBucket}>
                    <div ref={dummy}></div>
                    {displayMsgs()}
                </div>
                <form 
                className={classes.typingArea}
                onSubmit={(evt)=> sendMsg(evt)}
                >
                    <input 
                    className={classes.textBox}
                    placeholder='Type Message Here...'
                    onChange={(evt)=> setTextMsg(evt.target.value)}
                    value={textMsg}
                    >
                    </input>
                    <span className={classes.sendButt}>
                    <SendIcon 
                    onClick={(evt)=> sendMsg(evt)}
                    
                    />
                    </span>
                </form>
            </div>
            <div>
            { miniPlayer2 ? <MiniPlayer2 /> : null}
            </div>
        </div>
        <Drawer
            anchor={'top'}
            open={songDrawer}
            onClose={()=> setSongDrawer(false)}>
                <div className={classes.songDrawer} >
                    <div className={classes.songDrawerTitle}>SPOTIFY API</div>
                    <MusicBox 
                    insideChatBox={true} 
                    closeSongDrawer={()=> setSongDrawer(false)}
                    isSharingSong={isSharingSong}
                    />
                    <div 
                    style={{fontSize: '0.8rem', textAlign: 'center', opacity: '0.7'}}>
                        Touch Anywhere Below To Close Drawer 
                    </div>
                </div>
        </Drawer>
        <Dialog
            open={dailogOpen}
            onClose={()=> setDailogOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {chattingWith ? 
                `${chattingWith.display_name} wants to play spotify with you.`
                : null
                }
            </DialogTitle>
            <DialogActions>
            <button onClick={()=> setDailogOpen(false)}>Play</button>
            <button onClick={()=> dailogButton2()} autoFocus>
                Don't Play
            </button>
            </DialogActions>
        </Dialog>
        </>
    );
};

export default ChatBox;