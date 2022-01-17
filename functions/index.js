const 
functions       = require("firebase-functions"),
express         =   require('express'),
cors            =   require('cors'),
admin           =   require('firebase-admin');

admin.initializeApp({
    apiKey: "AIzaSyAINVFV1RI91b9KJ15qKJQF3Piv1GbwF_s",
    authDomain: "hyspotify-1.firebaseapp.com",
    projectId: "hyspotify-1",
    storageBucket: "hyspotify-1.appspot.com",
    messagingSenderId: "97714255131",
    appId: "1:97714255131:web:8f9b8de2325733e0048fbe",
    measurementId: "G-QN47HC9Z9N"
})
admin.firestore().settings({ignoreUndefinedProperties:true});
const app   = express();

app.use(cors());

//ROUTES
// app.use('/auth', require('./routes/auth'));
app.use('/spotify', require('./routes/spotify'));
app.use('/chats', require('./routes/chats'));   

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.user = functions.https.onRequest(app);