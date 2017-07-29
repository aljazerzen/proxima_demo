'use strict';

const
  path = require('path'),
  package_json = require(path.resolve('package.json'));

if (['dev', 'test', 'prod'].indexOf(process.env.ENV) == -1) {
  delete process.env.ENV;
}

module.exports = {
  app: {
    title: 'Proxima_demo',
    author: package_json.author,
    version: package_json.version,
  },

  // One of 'prod', 'dev', 'test'
  env: process.env.NODE_ENV || 'dev',

  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  domain: process.env.DOMAIN,
};

module.exports.db = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost/' + module.exports.app.title + '-' + module.exports.env,
};
