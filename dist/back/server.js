'use strict';

var app = require('./app.js');
var config = require('./config.js');
var logger = require('winston');

app.listen(config.port, function (error) {
  if (error) {
    logger.log('error', error);
  }
  logger.log('info', 'Server is running at localhost:' + config.port);
});

module.exports = app;