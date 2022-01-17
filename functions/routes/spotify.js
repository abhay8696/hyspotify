const
express         =   require('express'),
router          =   express.Router(),
SpotifyWebApi   =   require('spotify-web-api-node'),
axios           = require('axios'),
admin     =   require('firebase-admin'),
db              = admin.firestore();


// const redirect_Uri = 'http://localhost:3000/'
const redirect_Uri = 'https://hyspotify-1.web.app/'

router.post('/login', async (req, res)=> {
    const code = req.body.data.code;
    const redirect_Uri = req.body.data.redirectUri;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: redirect_Uri,
        clientId: '4a3b35b273c648259563ca05a9bb4f36',
        clientSecret: '5bff1554c7034de58821e18061303f88'
    })

    spotifyApi.authorizationCodeGrant(code).then(data=> {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(()=> {
        res.sendStatus(400);
        console.log('REQ>BODY')
        console.log(req.body)
        console.log('REQ>BODY')
    })
})

router.post('/refresh', async (req,res)=> {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: redirect_Uri,
        clientId: '4a3b35b273c648259563ca05a9bb4f36',
        clientSecret: '5bff1554c7034de58821e18061303f88',
        refreshToken
    })

    spotifyApi.refreshAccessToken()
        .then(
            data=> {
                res.json({
                    accessToken: data.body.accessToken,
                    expiresIn: data.body.expiresIn,
                })
            }
        ).catch(()=> {
            res.sendStatus(400);
        })
})

router.get('/me', async(req, res)=> {
    const { spotifytoken } = req.body;

    const config={
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Content-Type' : 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Bearer ${spotifytoken}`,
        }
    }
    axios(config).then((ress)=> {
        res.json(ress.data)
    })
    .catch(err=> {
        res.json(err)
    })
})

module.exports = router;