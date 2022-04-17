import React, { useState, useEffect, useContext } from 'react';
import Config from '../config.json';
import axios from 'axios';

//context
import { SpotifyTokenContext } from '../contexts/spotifyTokenContext';
import { UserDataContext } from '../contexts/userDataContext';
import { ChattingWithContext } from '../contexts/chattingWithContext';
//components
import MusicBox from './musicBox';
//styles
// import SpotifyStyles from './styles/spotifyStyles'
import NavbarStyles from './styles/navbarStyles'
import LogoutIcon from '@mui/icons-material/Logout';
//material ui
import Drawer from '@mui/material/Drawer';
import ChatIcon from '@mui/icons-material/Chat';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ForumIcon from '@mui/icons-material/Forum';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

let backendRoute;
if(process.env.NODE_ENV === "development"){
    backendRoute = Config.localBackend
    console.log('development MODE')
}else {backendRoute = Config.productionBackend; 
    console.log('production MODE')
}

const SpotifyNav = (props) => {
    //styles
    const classes = NavbarStyles();

    //states
    const
    [dpImg, setDpImg] = useState(),
    [songDrawer, setSongDrawer] = useState(false),
    [profileDrawer, setProfileDrawer] = useState(false);

    //contexts
    const
    [spotifyToken, setSpotifyToken] = useContext(SpotifyTokenContext),
    [userData, setUserData] = useContext(UserDataContext),
    [ chattingWith, setChattingWith ] = useContext(ChattingWithContext);

    //props
    const
    { loggedOut, insideChatsList, toggleChatListDrawer, insideChatBox, toggleChatBox } = props;
    
    //lifecycle
    useEffect(()=> {
        if(userData && userData.images[0]){
            setDpImg(<img 
                src={userData.images[0]} 
                className={classes.dpImg}
                alt='dp'
                onClick={()=> setProfileDrawer(true)}
                />)
        }else{
            setDpImg(null)
        }
    }, [userData])

    // functions
    const
    profileFunc = ()=> {
        console.log(userData)
    },
    logout = ()=> {
        setSpotifyToken(null);
        window.localStorage.clear();
    },
    profileSummary = ()=> {
        let arr = [];
        let proDp, proName, logoutDiv = <></>;
        if(chattingWith){
            proName = chattingWith.display_name;
            if(chattingWith.images[0]){
                proDp = <img 
                src={chattingWith.images[0].url} 
                className={classes.profileInfoImg}
                alt='dp'
                />
            }else proDp = <div  className={classes.profileInfoImg}>
                <AccountCircleIcon />
            </div>
        }else{
            proName = userData.display_name;
            if(userData.images[0]){
                proDp = <img 
                src={userData.images[0].url} 
                className={classes.profileInfoImg}
                alt='dp'
                />
            }else proDp = <div  className={classes.profileInfoImg}>
                    <AccountCircleIcon />
                </div>

            logoutDiv = <div className={classes.logoutDiv}>
                            <div 
                            className={classes.logoutButt}
                            onClick={()=> logout()}
                            >
                                <span>LOGOUT</span>
                                <LogoutIcon />
                            </div>
                        </div>
        }
        
        return (
        <div className={classes.profileInfo}>
            
            { proDp }
            <div className={classes.profileInfoBody}>
                {
                proName.length <= 9 ?
                <span className={classes.profileName}>{proName}</span>
                :
                <span className={classes.profileNameXS}>{proName}</span>
                }
            </div>
            { logoutDiv }
        </div>)
    }



    return (
        <>
        <div className={classes.spotifyNav}>
        <div className={classes.navbar}>
            {
            loggedOut ?
                <div className={classes.spotifyTitle}>
                    <span className={classes.hy}>hy</span>
                    <span className={classes.spotifyH1}>SPOTIFY</span>
                    <span className={classes.kamble}>{'<'}</span>
                    <span className={classes.abhay}>{'abhay_kamble'}</span>
                    <span className={classes.kamble}>{'/>'}</span>
                </div>
            : null
            }
            {//NAVBAR (ON MAIN LANDING PAGE)
            !loggedOut && userData && !insideChatsList && !insideChatBox ?
                <>
                <div className={classes.spotifyTitle}>
                    <span className={classes.hy}>hy</span>
                    <span className={classes.spotifyH1}>SPOTIFY</span>
                    {insideChatsList ? 
                    <span className={classes.hy}>Chats</span>
                    : null
                    }
                </div>

                <div className={classes.dp_chats}>
                    <ForumIcon 
                    className={classes.chatIcon} 
                    fontSize='large'
                    onClick= {()=> {
                        toggleChatListDrawer()
                        const fullScreenMode = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
                        if(!fullScreenMode) document.activeElement.requestFullscreen()
                    }}
                    />
                    {dpImg ? 
                        <img 
                        src={userData.images[0].url} 
                        className={classes.dpImg}
                        alt='dp'
                        onClick={()=> setProfileDrawer(true)}
                        />
                    : 
                        <AccountCircleIcon 
                        fontSize='large'
                        className={classes.dpImg}
                        onClick={()=> setProfileDrawer(true)}
                        />
                    }
                    
                </div>
                </>
            : 
            null
            }
            {//NAVBAR (inside chat list)
            insideChatsList ? 
                <>
                <div className={classes.chatListHead}>
                    <span className={classes.hy}>hy</span>
                    <span className={classes.spotifyH1}>SPOTIFY</span>
                    <span className={classes.hy}>Chats</span>
                </div>
                <CloseIcon 
                className={classes.chatIcon} 
                fontSize='large'
                onClick= {()=> toggleChatListDrawer()}
                />
                </>
            : null
            }
            {//NAVBAR (inside chat box)
            insideChatBox && chattingWith ?
                <>
                <div className={classes.spotifyTitle2}>
                    {chattingWith.images[0] ? 
                        <img 
                        src={chattingWith.images[0].url} 
                        className={classes.frndDP}
                        alt='dp'
                        onClick={()=> setProfileDrawer(true)}
                        />
                    : 
                        <div className={classes.frndDP}>
                            <AccountCircleIcon 
                            fontSize='large'
                            onClick={()=> setProfileDrawer(true)}
                            />
                        </div>
                    }
                    <div className={classes.spotifyTitle_name}>
                    <div>
                        <span className={classes.hy2}>hy</span>
                        <span className={classes.spotifyH12}>SPOTIFY</span>
                        <span className={classes.hy2}>Chats</span>
                    </div>
                    <span className={classes.frndName}>
                        {chattingWith.display_name}
                    </span>
                    </div>
                </div>
                    <CloseIcon 
                    className={classes.chatIcon} 
                    fontSize='large'
                    onClick= {()=> {
                        toggleChatBox()
                    }}
                    />
                </>
            :
            null
            }
        </div>
        <Drawer
            anchor={'top'}
            open={profileDrawer}
            onClose={()=> setProfileDrawer(false)}>
                { !loggedOut && userData ? profileSummary() : null}
        </Drawer>
        </div>
        {
            // showProfile ?
            // : null
        }
        </>
    );
};

export default SpotifyNav;



/*
            <div className={classes.displayPicture} onClick={()=> {
                setShowProfile(!showProfile);
            }}>
                <img 
                src={userData.images[0].url} 
                className={classes.dpImg}
                alt='dp'
                />
            </div>
*/