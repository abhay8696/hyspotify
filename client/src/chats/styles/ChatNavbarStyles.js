import { makeStyles } from '@mui/styles';

const ChatNavbarStyles = makeStyles(theme=> ({
    navbarSmall: {
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'column',
    },
    spotify:{
        color: '#42ff75',
    },
    hySpotifyChats:{
        fontSize: '0.6rem'
    },
    navBody: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px'
    },
    dp_name:{
        display: 'flex',
        alignItems: 'center',
        '& svg':{
            width: '2.5rem',
            height: '2.5rem',
        },
    },
    '@media only screen and (min-width: 768px)': { //desktop
        close: {
            '& :hover':{
                color: '#42ff75',
                cursor: 'pointer'
            },
        }
    },
    '@media only screen and (max-width: 767px)': { //mobile
        navbarSmall: {
            display: 'none !important'
        }
    }
}))

export default ChatNavbarStyles;