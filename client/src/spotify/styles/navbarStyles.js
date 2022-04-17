
import { makeStyles } from '@mui/styles';

const NavbarStyles = makeStyles(theme=> ({
    spotifyNav:{
        // backgroundColor: '#42ff75',
        borderBottom: '1px solid #42ff75',
        '@media only screen and (min-width: 768px)': { //desktop
            // padding: '2rem 0rem',
            height: '15vh !important',
            // backgroundColor: 'red',
            fontSize: '2.5rem',
            margin: 'auto 1rem',
            display: 'flex', alignItems: 'center',
        },
        '@media only screen and (max-width: 767px)': { //phones
            padding: '1rem 0.2rem',
            // backgroundColor: 'green',
            fontSize: '2rem',
        },
        '&:hover': {
            animation: '$nav 5000ms'
        },
    },
    navbar: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: '10',
        flex: '1'
    },
    hy:{
        color: 'white'
    },
    spotifyH1:{
        color: '#42ff75',
    },
    abhay: {
        color: '#42ff75',
        fontSize: '0.6rem'
    },
    kamble: {
        color: 'white',
        fontSize: '0.6rem'
    },
    dp_chats: {
        display: 'flex',
        alignItems: 'center',
    },
    chatIcon: {
        color: '#42ff75',
        fontSize: '2rem',
        marginRight: '1rem',
        '@media only screen and (min-width: 768px)': { //desktop
            display: 'none !important',
        },
    },
    dpImg:{
        height: '40px',
        borderRadius: '50%',
        '@media only screen and (min-width: 768px)': { //desktop
            height: '50px',
        },
    },
    spotifyTitle2:{
        display: 'flex',
        alignItems: 'flex-end'
    },
    frndDP:{
        height: '3rem',
        borderRadius: '50%',
        '@media only screen and (min-width: 768px)': { //desktop
            height: '50px',
        },
        '& svg': {
            height: '48px',
            width: '48px'
        }
    },
    spotifyTitle_name:{
        fontSize: '0.9rem',
        marginLeft: '4px',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    hy2: {
        fontSize: '0.6rem'
    },
    spotifyH12:{
        fontSize: '0.6rem',
        color: '#42ff75',
    },
    frndName:{
        fontSize: '1.5rem',
        color: 'white'
    },
    profileInfo: {
        animationName: '$profileInfo',
        animationDuration: '400ms',
        animationName: '$profileInfo',
        animationDirection: 'alternate',
        // animationTimingFunction: 'ease-out',
        backgroundColor: '#42ff75',
        display: 'flex',
        padding: '1rem 0.2rem',
        zIndex: '1',
    },
    profileInfoBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '0.5rem',
        opacity: '0',
        animation: '$pro 200ms 500ms forwards',
        // animationDuration: '500ms',
        // animationDelay: '1000ms'
    },
    profileName:{
        fontSize: '3rem',
    },
    profileNameXS:{
        fontSize: '2rem',
    },
    logoutDiv: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: '1',
        opacity: '0',
        animation: '$pro 200ms 800ms forwards',
        position: 'absolute',
        bottom: '8px',
        right: '8px'
    },
    logoutButt:{
        display: 'flex', alignItems: 'center',
        border: '1px solid white',
        padding: '1px 2px',
        fontSize: '0.7rem',
        borderRadius: '10px',
        '& > *': {
            margin: 'auto 2px'
        },
        '&:hover': {
            color: '#1DB954',
            backgroundColor: 'white',
        },
        cursor: 'pointer'
    },
    profileInfoImg: {
        height: '144px',
        width: '144px',
        borderRadius: '50%',
        opacity: '0',
        animation: '$pro 200ms 200ms forwards',
        '& svg': {
            width: '144px',
            height: '144px'
        }
    },
    //styles for inside chat list
    chatListHead:{
        '@media only screen and (min-width: 768px)': { //desktop
            display: 'none !important'
        },
    },

    '@keyframes profileInfo': {
        '0%': {
            transform: 'translateY(-100%)',
            opacity: '0'
        },
        '35%': {
            opacity: '0'
        },
        '100%': {
            transform: 'translateY(0px)',
            opacity: '1'
        },
    },
    '@keyframes pro': {
        '100%': {
            opacity: '1',
        },
    },
}))

export default NavbarStyles;