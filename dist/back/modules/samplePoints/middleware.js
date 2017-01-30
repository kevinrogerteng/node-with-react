'use strict';

var logger = require('winston');
var Q = require('q');

var _require = require('../../database/config.js'),
    connectToDb = _require.connectToDb;

var sampleData = require('./samplejson.json');

var getAllData = function getAllData(request, response) {
  function queryAllDatas() {
    return Q.promise(function (resolve, reject) {
      connectToDb(request, response).then(function (res) {
        resolve(res);
      });
    }).catch(function (error) {
      logger.info('error', error.body);
    });
  }

  return queryAllDatas();
};

module.exports = {
  getAllData: getAllData
};