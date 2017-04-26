var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
	validator = require('./libs/validator'),
	session = require('./libs/session'),
	database = require('./libs/database'),
	passport = require('./libs/passport')

var routes = require('./routes/index')

var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(database.init())

app.enable('trust proxy')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(validator())
app.use(methodOverride())
app.use(cookieParser())
app.use(session.check(), session.init())
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))

/**
 * 路由处理逻辑
 */
app.use(routes)


/**
 * 错误处理逻辑
 */
app.use(function(req, res, next) {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500)
		res.render('error', {
			message: err.message,
			error: err
		})
	})
}

app.use(function(err, req, res, next) {
	console.log(err)
	res.status(err.status || 500)
	res.send({
		message: err.message,
		error: {}
	})
})


module.exports = app
