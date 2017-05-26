var path = require('path')

module.exports = {
	appenders: [
		{
			type: 'console'
		},
		{
			type: 'dateFile',
			category: 'access',
			filename: path.join(__dirname, '../logs/access/access'),
			pattern: '-MM-dd--hh.log',
			alwaysIncludePattern: true
		},
		{
			type: 'dateFile',
			category: 'system',
			filename: path.join(__dirname, '../logs/system/system'),
			pattern: '-dd.log',
			alwaysIncludePattern: true
		},
		{
			type: 'dateFile',
			category: 'database',
			filename: path.join(__dirname, '../logs/database/database'),
			pattern: '-dd.log',
			alwaysIncludePattern: true
		},
		{
			type: 'logLevelFilter',
			level: 'ERROR',
			appender: {
				type: 'dateFile',
				filename: path.join(__dirname, '../logs/errors/error'),
				pattern: '-MM-dd.log',
				alwaysIncludePattern: true
			}
		}
	],
	replaceConsole: true
}