import { keyframes } from '@emotion/react';
import { makeStyles } from '@mui/styles';

const MusicBoxStyles = makeStyles(theme=> ({
    musicBox: {
        '@media only screen and (min-width: 768px)': { //desktop
            fontSize: '14px'
        },
        '@media only screen and (max-width: 767px)': { //phones
            fontSize: '14px'
        },
        overflowY: 'scroll',
        maxHeight: '80vh'
    },
    topTracksHeader:{
        margin: '12px auto 4px 8px',
        fontSize: '16px',
        fontWeight: '600'
    },
    topTrackList: {
        display: 'flex',
        overflowX: 'scroll',
        '&::-webkit-scrollbar': {
            '@media only screen and (min-width: 400px)': { //desktop
                backgroundColor: 'inherit',
                height: '4px',
                opacity: '0.1',
            },
            // '@media only screen and (max-width: 767px)': { //phones
            //     height: '4px'
            // },
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'grey',
            height: '4px',
            cursor: 'pointer',
            borderRadius: '2px'
        },
    },
    topTrack: {
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        marginTop: '4px',
        marginLeft: '8px', 
    },
    '@keyframes riseout': {
        '0%': {
            opacity: '0'
        },
        '100%': {
            opacity: '1'
        },
    },
    topTrackImg: {
        height: '144px',
        width: '144px',
        borderRadius: '10px',
        animation: '$riseout 500ms ease-in-out',
        // margin: '8px 8px 0 auto',
    },
    topTrackInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    topTrackArtist:{
        opacity: '0.6',
        fontSize: '14px'
    },
    searchBar:{
        // width: '100vw',
        display: 'flex',
        margin:'auto 8px',
    },
    searchBox: {
        flexGrow: '1',
        padding : '12px 8px',
        margin: '16px auto auto auto',
        backgroundColor: 'white',
        fontSize: '16px',
        borderRadius: '10px',
        outline: 'none',
        borderColor: 'inherit',
        borderStyle: 'none',
        color: '#5c5c5c',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchDrawer:{
        fontFamily: 'Montserrat',
    },
    closeSearchDiv:{
        display: 'flex', justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#42ff75'
    },
    closeSearchButton:{
        margin: '8px',
        padding: '4px 8px',
        border: '1px solid #fff',
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        cursor: 'pointer',
    },
}))

export default MusicBoxStyles;