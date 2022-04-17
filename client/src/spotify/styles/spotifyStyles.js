import { keyframes } from '@emotion/react';
import zIndex from '@mui/material/styles/zIndex';
import { makeStyles } from '@mui/styles';

const SpotifyStyles = makeStyles(theme=> ({
    spotifyRoot: {
        height: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
    },
    abhay: {
        color: '#42ff75',
        fontSize: '0.6rem'
    },
    kamble: {
        color: 'white',
        fontSize: '0.6rem'
    },
    '@keyframes nav': {
        '0%': {},
        '100%': {
            // transform: 'scaleY(50%)'
        }
    },
    spotifyBody:{
        flex: '1',
        '@media only screen and (min-width: 768px)': { //desktop
            display: 'flex',
            justifyContent: 'space-between'
        },
        '@media only screen and (max-width: 767px)': { //phones
            position: 'relative'
        },
    },
    body3:{
        maxWidth: '30vw',
        '@media only screen and (max-width: 767px)': { //phones
            display: 'none !important'
        },
    },
    searchIcon:{
        color: '#42ff75',
        fontSize: 'large',
    },
    chatListDrawer: {
        height: '50vh',
        '@media only screen and (min-width: 767px)': { //desktop
            display: 'none'
        }
    },
}))

export default SpotifyStyles;