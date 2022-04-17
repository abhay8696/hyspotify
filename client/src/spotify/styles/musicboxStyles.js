import { keyframes } from '@emotion/react';
import { makeStyles } from '@mui/styles';

const MusicBoxStyles = makeStyles(theme=> ({
    musicBox: {
        overflowY: 'scroll',
        maxHeight: 'calc(100vh - 15vh)',
        '@media only screen and (min-width: 768px)': { //desktop
            fontSize: '12px',
            maxWidth: '30vw'
        },
        '@media only screen and (max-width: 767px)': { //phones
            fontSize: '14px'
        },
        '&::-webkit-scrollbar': {
            width: '0.3rem',
            backgroundColor: 'inherit',
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'inherit',
            cursor: 'pointer',
            borderRadius: '2px',
            opacity: '0',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: 'red',
        },
        '&:hover':{
            '&::-webkit-scrollbar-thumb': {
                background: 'grey',
                cursor: 'pointer',
                borderRadius: '2px',
                opacity: '0',
            },
        },
        '& .MuiAccordion-root':{
            maxWidth: '95%',
            height: '3rem',
            borderRadius: '5px',
            marginTop: '1rem',
            padding: 0,
        }
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
        '&:hover':{
            color: '#42ff75'
        },
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
        height: '120px',
        width: '120px',
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
        margin:'16px 8px 8px 8px',
    },
    searchBox: {
        flexGrow: '1',
        padding : '12px 8px',
        backgroundColor: 'white',
        fontSize: '12px',
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
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        '@media only screen and (min-width: 768px)': { //desktop
            maxWidth: '30vw',
            '& > *': { 
                maxWidth: '30vw',
                marginTop: '115px',
                height: '100%',
            },
            '& .MuiPaper-root':{
                width: '30vw',
                backgroundColor: '#171821',
            }
        },
        '@media only screen and (mix-width: 767px)': { //below desktop
            minWidth: '100vw',
            '& > *': { 
                minWidth: '100vw',
                marginTop: '115px',
                height: '100%',
            },
        }
    },
    closeSearchDiv:{
        display: 'flex', justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#42ff75'
    },
}))

export default MusicBoxStyles;