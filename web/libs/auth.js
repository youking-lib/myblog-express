var passport = require('passport')

exports.isLocalAuthenticated = function(){
    return passport.authenticate('local', {session: false})
}

exports.isBearerAuthenticated = function(){
    return passport.authenticate('bearer', {session: false})
}