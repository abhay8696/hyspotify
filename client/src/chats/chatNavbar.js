import React from 'react';
//styles
import ChatNavbarStyles from './styles/ChatNavbarStyles';
//material ui
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ChatNavbar = (props) => {
    //styles
    const classes = ChatNavbarStyles();
    //props
    const { chattingWith, toggleChatBox } = props;
    //functions
    const 
    showDP = ()=> {
        if(chattingWith){
            if(chattingWith.images.length) return console.log(true)
            return <AccountCircleIcon />
        }
    }
return (
    <div className={classes.navbarSmall}>
        <div className={classes.hySpotifyChats}>
            <span className={classes.hy}>hy</span>
            <span className={classes.spotify}>SPOTIFY</span>
            <span className={classes.hy}>Chats</span>
        </div>
        <div className={classes.navBody}>
            <div className={classes.dp_name}>
                {showDP()}
                <div>{chattingWith ? chattingWith.display_name : null}</div>
            </div>
            <div 
            onClick={()=> toggleChatBox()} 
            className={classes.close}> 
                <CloseIcon/>
            </div>
        </div>
    </div>
)
}

export default ChatNavbar;