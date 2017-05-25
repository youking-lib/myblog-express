var router = require('express').Router(),
    Auth = require('../libs/auth'),
    Upload = require('../libs/upload')
    
    User = require('../controllers/user'),
    Article = require('../controllers/article'),
    Keyword = require('../controllers/keyword'),
    Media = require('../controllers/media'),
    Timeline = require('../controllers/timeline')
    

router.post('/login', User.login)

// User
router.get('/user', Auth.isBearerAuthenticated(), User.getByToken)
// router.get('/user/:id', User.getById)

// Article
router.get('/article', Article.list)
router.post('/article', Auth.isBearerAuthenticated(), Article.create)
router.delete('/article/:_id', Auth.isBearerAuthenticated(), Article.del)
router.put('/article', Auth.isBearerAuthenticated(), Article.create)

// Kerword
router.get('/keyword', Keyword.list)
router.post('/keyword', Auth.isBearerAuthenticated(), Keyword.create)
router.delete('/keyword/:_id', Auth.isBearerAuthenticated(), Keyword.del)

// Timeline
router.get('/timeline', Timeline.query)
router.post('/timeline', Timeline.create)

// Media
router.get('/media', Media.query)
router.post('/media', Upload.formidable(), Media.create)
router.delete('/media/:_id', Media.del)

module.exports = router