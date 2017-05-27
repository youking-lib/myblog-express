'use strict';

const mock = {
    'GET /api/v1/*': 'http://127.0.0.1:8080',
    'POST /api/v1/*': 'http://127.0.0.1:8080',
    'DELETE /api/v1/*': 'http://127.0.0.1:8080',
    'PUT /api/v1/*': 'http://127.0.0.1:8080',
};

require('fs').readdirSync(require('path').join(__dirname + '/mock'))
  .forEach(function (file) {
    Object.assign(mock, require('./mock/' + file));
  });

module.exports = mock;