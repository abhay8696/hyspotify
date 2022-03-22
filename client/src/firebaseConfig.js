import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAINVFV1RI91b9KJ15qKJQF3Piv1GbwF_s",
    authDomain: "hyspotify-1.firebaseapp.com",
    projectId: "hyspotify-1",
    storageBucket: "hyspotify-1.appspot.com",
    messagingSenderId: "97714255131",
    appId: "1:97714255131:web:8f9b8de2325733e0048fbe",
    measurementId: "G-QN47HC9Z9N"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;