import { makeStyles } from '@mui/styles';

const ChatBoxStyles = makeStyles(theme=> ({
    chatBox : {
        width: '100vw',
        fontFamily: 'Montserrat, Open Sans, sans-serif',
        backgroundColor: '#171821',
        height: '92vh',
        color: 'white',
        margin: '0px',
        display: 'flex', 
        flexDirection: 'column',
        '@media only screen and (min-width: 768px)': { //desktop
            width: '30vw',
            fontSize: '0.8rem !important',
            maxHeight: 'calc(100% - 15vh)',
        },'@media only screen and (mix-width: 767px)': { //mobile
            
        },
    },
    navbarBig: {
        '@media only screen and (min-width: 768px)': { //desktop
            display: 'none !important',
        },
    },
    navbarSmall:{
        '@media only screen and (mix-width: 767px)': { //mobile
            display: 'none !important'
        },
    },
    songSwitch: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#42ff75',
        color: 'black',
        // paddingLeft: '4px',
        // paddingRight: '8px'
    },
    musicIcon:{
        animationName: '$riseout',
        animationDuration: '200ms',
        animationTimingFunction: 'ease-in-out',
        marginRight: '8px',
        '@media only screen and (min-width: 768px)': { //desktop
            display: 'none !important',
        }
    },
    '@keyframes riseout': {
        '0%': {
            transform: 'scale(0.1, 0.1)'
        },
        '100%': {
            transform: 'scale(1, 1)'
        },
    },
    songDrawer:{
        fontFamily: 'Montserrat',
        borderBottom: '3px solid #42ff75',
        backgroundColor: '#171821',
        color: 'white',
    },
    songDrawerTitle:{
        textAlign: 'center',
        fontSize: '1.5rem',
        marginTop: '8px',
        color: '#42ff75'
    },
    listenTogetherIcons: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    },
    msgArea:{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'auto',
        boxSizing: 'border-box',
        '& > *': { width: '100%',},
        overflowX: 'hidden',
    },
    msgBucket:{
        display:'flex',
        flexDirection: 'column-reverse',
        overflow: 'auto',
        fontSize: '0.8rem',
        borderRadius: '0px 0px 25px 25px',
        '@media only screen and (min-width: 768px)': { //desktop
            '&::-webkit-scrollbar': {
                width: '0.3rem',
                backgroundColor: 'inherit',
            },
            '&::-webkit-scrollbar-thumb': {
                background: 'grey',
                borderRadius: '2px',
                opacity: '0',
                '&:hover':{
                    cursor: 'pointer',
                },
            },
        },
        fontSize: '12px'
    },
    myMsg: {
        backgroundColor: 'white',
        minWidth: '30%',
        color: 'black',
        maxWidth: '50%',
        "border-radius": '10px 10px 0px 10px',
        marginLeft: 'auto',
        padding: '4px 8px',
        margin: '4px 8px',
        textAlign: 'left',
        boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
        display: 'flex',
        flexDirection: 'column',
        animationName: '$transitionInChatBox',
        animationDuration: '400ms',
        '@media only screen and (min-width: 768px)': { //desktop
            // '& span': { fontSize: '12px' },
        },
    },
    frndMsg:{
        backgroundColor: '#42ff75',
        minWidth: '30%',
        color: 'black',
        maxWidth: '50%',
        "border-radius": '0px 10px 10px 10px',
        marginRight: 'auto',
        padding: '4px 8px',
        margin: '4px 8px',
        textAlign: 'left',
        boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
        display: 'flex',
        flexDirection: 'column',
        animationName: '$transitionInChatList',
        animationDuration: '400ms',
    },
    time: {
        textAlign: 'right',
        fontSize: '10px',
        fontStyle: 'italic',
        opacity: '0.7',
        '@media only screen and (min-width: 768px)': { //desktop
            fontSize: '9px'
        },
        // borderTop: '0.5px solid white'
    },
    typingArea:{
        width: '95vw',
        display: 'flex', alignItems: 'center',
        margin:'0px 8px 8px 8px',
        borderRadius: '25px',
        backgroundColor: 'white',
        color: 'black',
        '@media only screen and (min-width: 768px)': { //desktop
            width: '99%',
        },
    },
    textBox: {
        flexGrow: '1',
        padding : '12px 8px',
        // backgroundColor: 'grey',
        borderRadius: '25px',
        fontSize: '12px',
        outline: 'none',
        borderStyle: 'none',
        '&:focus': {
            
        }
    },
    sendButt: {
        marginRight: '10px',
        borderRadius: '50%',
        '@media only screen and (min-width: 768px)': { //desktop
            '& :hover':{
                color: '#42ff75',
                cursor: 'pointer'
            },
        },
    }
}))

export default ChatBoxStyles;