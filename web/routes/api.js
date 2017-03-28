var router = require('express').Router(),
    
    User = require('../controllers/user')

router.get('/article', (req, res) => {
    res.send('5555')
})


router.post('/login', User.login)

// User
router.get('/', User.getByToken)

module.exports = router