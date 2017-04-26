var router = require('express').Router(),
    Auth = require('../libs/auth'),
    
    User = require('../controllers/user'),
    Article = require('../controllers/article'),

    Keyword = require('../controllers/keyword')
    

router.post('/login', User.login)

// User
router.get('/user', Auth.isBearerAuthenticated(), User.getByToken)
// router.get('/user/:id', User.getById)

// Article
router.get('/article', Article.list)
router.post('/article', Auth.isBearerAuthenticated(), Article.create)
router.get('/article/:_id', Auth.isBearerAuthenticated(), Article.del)
// Kerword
router.get('/keyword', Keyword.list)
router.post('/keyword', Keyword.create)
router.delete('/keyword/:_id', Keyword.del)

module.exports = router