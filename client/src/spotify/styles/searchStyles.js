
import { makeStyles } from '@mui/styles';

const SearchStyles = makeStyles(theme=> ({
    searchComp: {
        width: '100%',
        padding: '8px 0px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#42ff75',
        '@media only screen and (min-width: 768px)': { //desktop
            backgroundColor: '#171821',
            color: 'white',
        },
    },
    searchCompHeader:{
        textAlign: 'center',
    },
    searchBar:{
        width: '95%',
        display: 'flex', alignItems: 'center',
        margin:'8px',
        position: 'relative',
    },
    searchBox: {
        flexGrow: '1',
        padding : '12px 8px',
        fontSize: '12px',
        borderRadius: '10px',
        outline: 'none',
        borderStyle: 'none',
        '&:focus': {
            
        }
    },
    closeSearchButton:{
        // padding: '4px 8px',
        cursor: 'pointer',
        position: 'absolute',
        right: '5px',
        top: '5px',
        border: '1px soild black',
        '& svg':{
            // fontSize: '2rem',
            color: 'black'
        },
    },
    searchResults: {
        height: '50vh',
        width: '95%',
        overflow: 'auto',
        '@media only screen and (min-width: 400px)': {//desktop
            '&::-webkit-scrollbar': {
                backgroundColor: 'inherit',
                width: '4px',
                opacity: '0.1',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'grey',
                width: '4px',
                cursor: 'pointer',
                borderRadius: '2px'
            },
            '& :hover':{
                color: '#42ff75',
                cursor: 'pointer'
            },
        },
    },
    track: {
        display: 'flex',
        margin: '8px auto',
        animation: '$risein 500ms'
    },
    '@keyframes risein': {
        '0%': {
            opacity: '0'
        },
        '100%': {
            opacity: '1'
        }
    },
    trackImg:{
        borderRadius: '10px'
    },
    trackInfo:{
        marginLeft: '8px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        borderBottom: '1px solid #1DB954',
        flex: '1',
        fontSize: '12px'
    },
    trackTitle:{

    },
    trackArtist:{
        fontSize: '12px',
        opacity: '0.7'
    },
}))

export default SearchStyles