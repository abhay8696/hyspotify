import { makeStyles } from '@mui/styles';

const ChatListStyles = makeStyles(theme=> ({
    chatList : {
        width: '100vw',
        fontFamily: 'Montserrat, Open Sans, sans-serif',
        backgroundColor: '#171821',
        height: '100%',
        color: 'white'
    },
    chatListItem:{
        display: 'flex', alignItems: 'center',
        margin: '4px auto',
        '& svg': {
            width: '3rem',
            height: '3rem'
        },
    },
    dp:{
        height: '3rem',
        borderRadius: '50%',
    },
    chatListName:{
        marginLeft: '8px',
    }
}))

export default ChatListStyles;