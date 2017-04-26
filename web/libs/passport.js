var passport = require('passport'),
    BearerStrategy = require('passport-http-bearer'),
    LocalStrategy = require('passport-local').Strategy,

    AccessToken = require('../models/AccessToken'),
    User = require('../models/User')

/**
 * 序列化 username
 */
passport.serializeUser(function(user, done) {
    done(null, user.username)
})

/**
 * 反序列化 username
 */
passport.deserializeUser(function(username, done) {
    User.findOne({username: username}).then(user => {

        done(null, user)
    }).catch(err => {
        done(err)
    })
})

/**
 * 注册策略 BearerStrategy
 */
passport.use(new BearerStrategy(function(token, done){
    
    AccessToken.findOne({token: token}).populate('user').then(doc => {
        if(!doc) {
            done(null, false, {error: '未认证! '})
        }

        console.log('BearerStrategy', doc)
        done(null, doc.user)
    }).catch(err => {
        done(err)
    })
}))

/**
 * 注册策略 LocalStrategy
 */
passport.use(new LocalStrategy(function(username, password, done){
    
    User.findOne({ username: username }).then(user => {
        if (!user) { 
            return done(null, false)
        }
        if (!user.comparePassword(password)) { 
            return done(null, false, {error: '密码错误'}) 
        }

        done(null, user);
    }).catch(err => {
        done(err)
    })
}))




module.exports = passport