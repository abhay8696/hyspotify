
import { makeStyles } from '@mui/styles';

const SearchStyles = makeStyles(theme=> ({
    searchComp: {
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#42ff75'
    },
    searchCompHeader:{
        textAlign: 'center',
    },
    searchBar:{
        width: '90vw',
        display: 'flex',
        margin:'8px',
    },
    searchBox: {
        flexGrow: '1',
        padding : '12px 8px',
        fontSize: '16px',
        borderRadius: '10px',
        outline: 'none',
        borderStyle: 'none',
        '&:focus': {
            
        }
    },
    searchResults: {
        height: '50vh',
        overflow: 'scroll'
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
        flex: '1'
    },
    trackTitle:{

    },
    trackArtist:{
        fontSize: '0.8rem',
        opacity: '0.7'
    },
}))

export default SearchStyles