var User = require('../models/User'),
    bcrypt = require('bcryptjs')

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
            // Bad Request
            console.log(errs.array())
            return res.status(400).end()
        }

        User.findOne({ username: req.body.username })
            .then(user => {

                req.session.userId = user._id
                req.session.user = {
                    username: user.username,
                    level: user.level,
                    id: user._id
                }
                
                if (req.body.autoSignIn) {
                    req.session.cookie.maxAge = 60 * 1000 * 60 * 24 * 90
                }

                return bcrypt.compare(req.body.password, user.password)
            }, err => {

                delete req.session.user
                delete req.session.userId

                err.type = 'database'
                return Promise.reject(err)
            })
            .then(passed => {

                if (passed) {
                    res.status(200).json(req.session.user)
                } else {
                    return Promise.reject({
                        code: 'ERROR_IN_PASSWORD',
                        message: '密码错误! '
                    })
                }
            })
            .catch(err => {
                // Unauthorized
                res.status(401).json({
                    error: err
                })
            })
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

exports.getByToken = function(req, res, next) {
    
}
