'use strict';

const mock = {
    'GET /api/v1/*': 'http://127.0.0.1:3000',
    'POST /api/v1/*': 'http://127.0.0.1:3000',
    'DELETE /api/v1/*': 'http://127.0.0.1:3000',
    'PUT /api/v1/*': 'http://127.0.0.1:3000',
};

require('fs').readdirSync(require('path').join(__dirname + '/mock'))
  .forEach(function (file) {
    Object.assign(mock, require('./mock/' + file));
  });

module.exports = mock;