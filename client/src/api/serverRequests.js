import axios from 'axios'
import Config from '../config.json';
import app from '../firebaseConfig'
import { getFirestore, doc, setDoc, updateDoc, onSnapshot, collection, query, orderBy, limit, addDoc, getDoc  } from 'firebase/firestore';
import admin from 'firebase-admin'

let backendRoute;
if(process.env.NODE_ENV === "development"){
    backendRoute = Config.localBackend
    console.log('development MODE')
}else {backendRoute = Config.productionBackend; 
    console.log('production MODE')
}

const db = getFirestore(app)


export const isSharingSongAPI = async data => {
    const { myID, myName, frndID, frndName, isSharingSong, songSharer } = data
    const myChatRef = doc(db, "users", myID, "chats",`${frndName}-${frndID}`)
    const frndChatRef = doc(db, "users", frndID, "chats",`${myName}-${myID}`)

    const chatRefDocSnap1 = await getDoc(myChatRef)
    const chatRefDocSnap2 = await getDoc(frndChatRef)
    
    if(chatRefDocSnap1.exists() && chatRefDocSnap2.exists()){
        updateDoc(myChatRef, {
            isSharingSong : isSharingSong,
            songSharer: songSharer
        })
        updateDoc(frndChatRef, {
            isSharingSong : isSharingSong,
            songSharer: songSharer
        })
    }else{
        setDoc(myChatRef, {
            name: frndName,
            isSharingSong : isSharingSong,
            songSharer: songSharer
        })
        setDoc(frndChatRef, {
            name: myName,
            isSharingSong : isSharingSong,
            songSharer: songSharer
        })
    }
    
}

export const playSharedSongAPI = async data=> {
    const { myID, myName, frndID, frndName, uri, trackName } = data
    const myChatRef = doc(db, "users", myID, "chats",`${frndName}-${frndID}`)
    const frndChatRef = doc(db, "users", frndID, "chats",`${myName}-${myID}`)

    const chatRefDocSnap1 = await getDoc(myChatRef)
    const chatRefDocSnap2 = await getDoc(frndChatRef)
    
    if(chatRefDocSnap1.exists() && chatRefDocSnap2.exists()){
        updateDoc(myChatRef, {
            sharedUri: uri, 
            sharedTrackName: trackName
        })
        updateDoc(frndChatRef, {
            sharedUri: uri, 
            sharedTrackName: trackName
        })
    }
}

export const pauseSongAPI = (data)=> {
    const { userData, chattingWith, playingTrack} = data;
    axios.post(`${backendRoute}/chats/pauseSong`, {
        myCred: userData,
        frndCred: chattingWith,
        playingTrack: playingTrack
    })
    .then(res=> console.log(res.data))
    .catch(err=> console.error(err))
}

export const addMsgToMyDatabase = async (myID, frndName, frndID, msg)=> {
    let myChatRef = doc(db, "users", myID, "chats",`${frndName}-${frndID}`)
    let msgRef = collection(myChatRef, "messages")

    const chatRefDocSnap = await getDoc(myChatRef)
    if(chatRefDocSnap.exists()){
        console.log('existsssssssssss')
        const addMsg = addDoc(msgRef, {
            from: 'me',
            msg: msg,
            createdAt: admin.firestore.Timestamp.now().toDate()
        }).then(()=> {
            updateDoc(myChatRef, {
                name: frndName,
                lastMsgText: msg,
                lastMsgTime: admin.firestore.Timestamp.now().toDate()
            })
        })
    }else {
        console.log('DO NOTTTTTTTTTTTTTTT')
        const addMsg = addDoc(msgRef, {
            from: 'me',
            msg: msg,
            createdAt: admin.firestore.Timestamp.now().toDate()
        }).then(()=> {
            setDoc(myChatRef, {
                name: frndName,
                lastMsgText: msg,
                lastMsgTime: admin.firestore.Timestamp.now().toDate()
            })
        })
    }
    
}
export const addMsgToFrndsDatabase = async(frndID, myName, myID, msg)=> {
    let frndChatRef = doc(db, "users", frndID, "chats",`${myName}-${myID}`)
    let msgRef = collection(frndChatRef, "messages")

    const chatRefDocSnap = await getDoc(frndChatRef)
    if(chatRefDocSnap.exists()){
        const addMsg = addDoc(msgRef, {
            from: myName,
            msg: msg,
            createdAt: admin.firestore.Timestamp.now().toDate()
        }).then(()=> {
            updateDoc(frndChatRef, {
                name: myName,
                lastMsgText: msg,
                lastMsgTime: admin.firestore.Timestamp.now().toDate()
            })
        })
    }else {
        const addMsg = addDoc(msgRef, {
            from: myName,
            msg: msg,
            createdAt: admin.firestore.Timestamp.now().toDate()
        }).then(()=> {
            setDoc(frndChatRef, {
                name: myName,
                lastMsgText: msg,
                lastMsgTime: admin.firestore.Timestamp.now().toDate()
            })
        })
    }
}