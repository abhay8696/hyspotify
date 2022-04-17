import { keyframes } from '@emotion/react';
import { makeStyles } from '@mui/styles';

const MiniPlayerStyles = makeStyles(theme=> ({
    miniPlayer: {
        position: 'absolute',
        bottom: '0',
        width: '100vw',
        '@media only screen and (min-width: 768px)': { //desktop
            maxWidth: '30vw'
        },
    },
    playNotificaton: {
        position: 'absolute',
        padding: '16px',
        borderRadius: '50px',
        backgroundColor: 'red',
        top: '50vh',
    },
    playingSongName: {
        fontStyle: 'italic',
        fontWeight: 'bold',
    }
}))

export default MiniPlayerStyles;