'use strict';

var logger = require('winston');
var Mssql = require('mssql');
var Q = require('q');

var _process$env = process.env,
    DB_SERVER = _process$env.DB_SERVER,
    DB_USERNAME = _process$env.DB_USERNAME,
    DB_PASSWORD = _process$env.DB_PASSWORD,
    DB_OPTIONS_ENCRYPT = _process$env.DB_OPTIONS_ENCRYPT,
    DB_OPTIONS_DATABASE = _process$env.DB_OPTIONS_DATABASE;


var dbConfig = {
  user: DB_USERNAME,
  password: DB_PASSWORD,
  server: DB_SERVER,
  database: DB_OPTIONS_DATABASE,
  parseJSON: true,
  options: {
    encrypt: DB_OPTIONS_ENCRYPT
  }
};

function connectToDb(req, res) {
  return Q.promise(function (resolve, reject) {

    var connection = getDbConfig();
    connection.connect(function (error) {
      if (error) {
        logger.info('eror', 'connection error');
        logger.info('error', error);
        reject(error);
      }

      var request = prepareRequest(connection);
      request.query('SELECT TOP 5 * FROM dbo.RMSItems;').then(function (recordset) {
        logger.info('info', 'query succesful');
        resolve(recordset);
        connection.close();
      }).catch(function (error) {
        logger.info('error', 'failed to query db!');
        logger.info('error', error);
        reject(error);
      });
    });
  });

  function getDbConfig() {
    return new Mssql.Connection(dbConfig);
  }

  function prepareRequest(connection) {
    return new Mssql.Request(connection);
  }
}

module.exports = {
  connectToDb: connectToDb
};