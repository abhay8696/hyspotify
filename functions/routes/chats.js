const
express         =   require('express'),
router          =   express.Router(),
SpotifyWebApi   =   require('spotify-web-api-node'),
axios           =   require('axios'),
admin           =   require('firebase-admin'),
db              =   admin.firestore();

// ROUTES
//register user's spotify credentials if logged in for 1st time
router.post('/registerUser', async(req, res)=> {
    const { country, display_name, email, followers, id, images, product, type, uri } = req.body
    const userRef = db.collection('users').doc(`${id}`);

    userRef.get()
    .then(doc=> {
        if(!doc.exists){
            userRef.set({ country, display_name, email, followers, id, images, product, type, uri })
            .then(()=> {
                console.log('new user added!');
                return res.json('new user added!');
        })
            .catch((error) => {
                console.log("Error getting document:", error);
                return res.json("Error getting document:", error)
            })
        }
        else return res.json('User Already Exists');
    })
})

//fetch all users
router.get('/allUsers', async(req, res)=> {
    const allUsersRef = db.collection('users')
    
    allUsersRef.onSnapshot(snapshot=> {
        const userArray = snapshot.docs.map(doc=>({
            country: doc.data().country,
            display_name: doc.data().display_name,
            images: doc.data().images,
            product: doc.data().product,
            id: doc.data().id
        }))
        return res.json( userArray);
    })

})


module.exports = router;