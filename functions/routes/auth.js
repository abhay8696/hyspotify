const
express     =   require('express'),
router      =   express.Router();

router.get('/', async (req, res)=> {
    res.json('auth route')
})

module.exports = router;