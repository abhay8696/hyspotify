import { keyframes } from '@emotion/react';
import { makeStyles } from '@mui/styles';

const LoginStyles = makeStyles(theme=> ({
    spotifyLogin: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    loadingDots: {
        // backgroundColor: 'red',
        fontSize: '10rem',
        animationName: '$dotColors',
        animationDuration: '2000ms',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
        color: 'white'
    },
    '@keyframes dotColors': {
        '0%': { color: 'white'},
        '50%': { color: '#1DB954'},
        // '75%': { color: 'black'},
        '100%': { color: '#42ff75'},
    }, 
    pageBody: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: '1',
        textAlign: 'center',
        position: 'relative'
    },
    introText: {
        color: 'white'
    },
    loginButton: {
    },
    loginButt: {
        color: '#42ff75',
        border: '1px solid #42ff75',
        padding: '16px 32px',
        borderRadius: '10px',
        '&:hover': {
            backgroundColor: '#42ff75',
            color: 'white',
        }
    },
    description: {
        color: 'white',
        textAlign: 'center',
        // margin: '32px auto',
        marginTop: '32px',
        marginBottom: '32px',
        fontSize: '0.9rem',
        
    },
    takingToSpotify: {
        animationName: '$animation1',
        animationDuration: '1000ms',
        position: 'absolute',
        top: '0',
        left: '0',
        textAlign: 'center',
        width: '99%'
    },
    '@keyframes animation1': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 }
    },

}))

export default LoginStyles;