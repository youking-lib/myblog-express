var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	cookieParser = require('cookie-parser'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
	logger = require('./libs/logger'),
	validator = require('./libs/validator'),
	session = require('./libs/session'),
	database = require('./libs/database'),
	passport = require('./libs/passport'),
	error = require('./controllers/error')

var routes = require('./routes/index')

var app = express()
database.init()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger.access())

app.enable('trust proxy')
app.use(bodyParser.json({limit: "100000kb"}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(validator())
app.use(methodOverride())
app.use(cookieParser())
app.use(session.check(), session.init())
app.use(passport.initialize())
app.use(passport.session())
app.use('/public', express.static(path.join(__dirname, 'public')))

/**
 * 路由处理逻辑
 */
app.use(routes)

/**
 * 错误处理逻辑
 */
app.use(error.notFound)
app.use(error.error)


module.exports = app