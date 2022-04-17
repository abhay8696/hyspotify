
import { makeStyles } from '@mui/styles';

const PlayBoxStyles = makeStyles(theme=> ({
    '@media only screen and (min-width: 768px)': { //desktop
        body2:{
            width: '30vw',
            '& img': {
                maxWidth: '100%',
                // marginTop: '5%',
                borderRadius: '20px',
            },
            padding: '5px',
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        imgReactAudioPlayer:{
            display: 'none'
        },
    },
    currentTrackInfo:{
        display: 'flex', alignItems: 'center', flexDirection: 'column',
        '& span': {
            marginTop: '1rem'
        },
    },
    currentSongImg:{
        borderRadius: '5%',
    },
    noPremium:{
        textAlign: 'center',
        fontSize: '0.7rem',
        color: '#ff9966',
        marginBottom: '1rem',
    },
    '@media only screen and (max-width: 767px)': { //phones
        // display: 'none !important'
        body2:{
            position: 'absolute',
            bottom: '0',
            zIndex: '1300',
            backgroundColor: '#171821',
        },
        currentTrackInfo:{
            display: 'none'
        },
        noPremium:{
            display: 'none'
        },
        reactAudioPlayer:{
            width: '100vw',
            height: '8vh',
            // backgroundColor: 'red',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        imgReactAudioPlayer:{
            maxWidth: '20%',
            maxHeight: '90%',
            borderRadius: '50%'
        },
    },
}))

export default PlayBoxStyles;