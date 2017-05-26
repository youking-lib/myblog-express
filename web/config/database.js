var mongoPort = process.env.NODE_ENV === 'production' ? '49494' : '27017' 

module.exports = {
    host: '127.0.0.1',
    port: mongoPort,
    database: 'fsblog',
    options: {
        user: '',
        pass: ''
    }
};