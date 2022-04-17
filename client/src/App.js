import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import app from './firebaseConfig'
// import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import admin from 'firebase-admin'
import axios from 'axios'
import './App.css'

//components
import SpotifyRoot from './spotify/spotifyRoot';
import SpotifyLogin from './spotify/spotifyLogin';

//contexts
import { SpotifyTokenContext } from './contexts/spotifyTokenContext';
import { SpotifyTrackUriContext } from './contexts/spotifyTrackUriContext';
import { UserDataContext } from './contexts/userDataContext';
import { ChattingWithContext } from './contexts/chattingWithContext'
import { PlayingTrackContext } from './contexts/playingTrackContext'
import { MiniPlayer2Context } from './contexts/miniPlayer2Context'



const App = () => {
  // states
  const
  [userData, setUserData] = useState(),
  [spotifytoken, setSpotifyToken] = useState(),
  [spotifyTrackUri, setSpotifyTrackUri] = useState({
    uri: undefined, trackName: undefined, isSharingSong: undefined, data: undefined,
  }),
  [ playingTrack, setPlayingTrack ] = useState(false),
  [chattingWith, setChattingWith] = useState(),
  [ miniPlayer2, setMiniPlayer2 ] = useState(false);
  
  const db = getFirestore(app);

  //life cycle
  useEffect(()=> {
    if(window.localStorage.getItem('spotifyToken')){
      setSpotifyToken(window.localStorage.getItem('spotifyToken'))
    }
  }, [])

  //functions 


  return (
    <Router>
    <div className="App">
      <SpotifyTokenContext.Provider value={[spotifytoken, setSpotifyToken]}>
      <UserDataContext.Provider value={[userData, setUserData]}>
      <SpotifyTrackUriContext.Provider value={[spotifyTrackUri, setSpotifyTrackUri]}>
      <PlayingTrackContext.Provider value={[ playingTrack, setPlayingTrack ]}>
      <ChattingWithContext.Provider value={[chattingWith, setChattingWith]}>
      <MiniPlayer2Context.Provider value={[ miniPlayer2, setMiniPlayer2 ]}>
        <Routes>
          <Route exact path='/' 
          element={spotifytoken ? <SpotifyRoot db={db}/> : <SpotifyLogin/>}
          />
          <Route exact path='/chats' 
          element={spotifytoken ? <SpotifyRoot db={db}/> : <SpotifyLogin/>}
          />
        </Routes>
      </MiniPlayer2Context.Provider>
      </ChattingWithContext.Provider>
      </PlayingTrackContext.Provider>
      </SpotifyTrackUriContext.Provider>
      </UserDataContext.Provider>
      </SpotifyTokenContext.Provider>
    </div>
    </Router>
  );
};

export default App;
