import { makeStyles } from '@mui/styles';

const LoadingCompStyles = makeStyles(theme=> ({
    loadingComp: {
        position: 'absolute',
        width: '100vw',
        top: '50%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white'
    },
    dot: {
        display: 'block',
        width: '1.5rem',
        height: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '50%',
        margin: '1rem',
        animationName: '$dotAnimation',
        animationDuration: '1000ms',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
        position: 'relative',
    },
    '@keyframes dotAnimation': {
        '0%': { backgroundColor: '#42ff75', left: '-50px'},
        '50%': { backgroundColor: '#1DB954', left: '50px'},
        // '75%': { backgroundColor: '#42ff75', left: '10px'},
        '100%': { backgroundColor: '#42ff75', left: '-50px'},
    }, 
}))

export default LoadingCompStyles;