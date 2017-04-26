var User = require('../models/User'),
    bcrypt = require('bcryptjs'),
    passport = require('../libs/passport'),
    auth2Utils = require('../utils/auth2'),

    AccessToken = require('../models/AccessToken')

/**
 * 检查是否登录
 * @param  {[object]} req 
 * @param  {[object]} res 
 * @param  {Function} next
 */
exports.check = function(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.staus(401).json({
            error: {
                code: 'NOT_LOGGED_IN',
                message: '还没有登录！'
            }
        })
    }
}

/**
 * 登录
 * @param  {[object]}   req
 * @param  {[object]}   res
 * @param  {Function} next
 */
exports.login = function(req, res, next) {
    req.checkBody({
        username: {
            notEmpty: {
                options: [true],
                errorMessage: '用户名不能为空！'
            }
        },
        password: {
            notEmpty: {
                options: [true],
                errorMessage: '密码不能为空！'
            },
            isLength: {
                options: [6],
                errorMessage: '密码不能少于6位！'
            }
        },
        autoSignIn: {
            optional: true,
            isBoolean: {
                errorMessage: '必须是Boolean值! '
            }
        }
    })

    req.getValidationResult().then(errs => {
        if (!errs.isEmpty()) {
            return res.status(400).end()
        }
        
        // 本地认证策略
        passport.authenticate('local', function (err, user, info) {
            if(err) {
                return res.status(401).json(err)
            }
            if(info) {
                return res.status(403).send(info)
            }
            var token = auth2Utils.signToken()

            AccessToken.findOneAndUpdate({user: user._id}, {
                token: token,
                user: user._id,
                createAt: Date.now()
            }, {
                upsert: true
            }).then(doc => {

                res.status(200).json({token: token})
            }).catch(err => next(err))
        })(req, res, next)
    })
}


/**
 * 登出
 * @param  {[object]}   req 
 * @param  {[object]}   res 
 * @param  {Function} next
 */
exports.signOut = function(req, res, next) {
    req.session.destory(function(err) {
        if(err){
            return res.status(500).end()
        }
        // No Content
        res.status(204).end()
    })
}

/**
 * 获取用户信息
 * @param  {[object]}   req  [description]
 * @param  {[object]}   res  [description]
 * @param  {Function} next [description]
 */
exports.getByToken = function(req, res, next) {
    
    res.status(200).json(req.user)
}
