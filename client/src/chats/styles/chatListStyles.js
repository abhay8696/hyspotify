import { makeStyles } from '@mui/styles';

const ChatListStyles = makeStyles(theme=> ({
    chatList : {
        width: '100vw',
        fontFamily: 'Montserrat, Open Sans, sans-serif',
        backgroundColor: '#171821',
        height: '100%',
        color: 'white',
        fontSize: '12px',
    },
    chatListItem:{
        display: 'flex', alignItems: 'center',
        margin: '4px auto',
        '& svg': {
            width: '3rem',
            height: '3rem'
        },
    },
    dp:{
        height: '3rem',
        borderRadius: '50%',
    },
    chatListName:{
        marginLeft: '8px',
    },
    '@media only screen and (min-width: 768px)': { //desktop
        chatList:{
            maxWidth: '100%'
        },
        chatListNav:{
            display: 'none'
        },
        chatListItem:{
            cursor:'pointer',
            '&:hover':{
                color: '#42ff75'
            }
        },
    },
    chatDrawer:{
        // backgroundColor: 'red',
        // display: 'none',
        '@media only screen and (min-width: 767px)': { //desktop
            '& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop':{
                left: 'auto'
            },
            '& .MuiPaper-root':{
                overflowY: 'hidden !important',
            },
            maxWidth: '30vw',
            marginTop: '15vh',
            '& > *': { 
                maxWidth: '30vw',
                marginTop: '16vh',
                // height: '100%',
            },
            // '& .MuiPaper-root':{
            //     width: '30vw',
            //     border: '1px solid black',
            //     backgroundColor: '#171821',
            // }
        },
    },
}))

export default ChatListStyles;