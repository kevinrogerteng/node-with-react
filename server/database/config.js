const logger = require('winston')
const Mssql = require('mssql')
const Q = require('q')

const {DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_OPTIONS_ENCRYPT, DB_OPTIONS_DATABASE} = process.env

const dbConfig = {
  user: DB_USERNAME,
  password: DB_PASSWORD,
  server: DB_SERVER,
  database: DB_OPTIONS_DATABASE,
  parseJSON: true,
  options: {
    encrypt: DB_OPTIONS_ENCRYPT
  }
}

function connectToDb(req, res) {
  return Q.promise((resolve, reject) => {

    const connection = getDbConfig()
    connection.connect((error) => {
      if (error) {
        logger.info('eror', 'connection error')
        logger.info('error', error)
        reject(error)
      }

      const request = prepareRequest(connection)
      request.query('SELECT TOP 5 * FROM dbo.RMSItems;').then((recordset) => {
        logger.info('info', 'query succesful')
        resolve(recordset)
        connection.close()
      }).catch((error) => {
        logger.info('error', 'failed to query db!')
        logger.info('error', error)
        reject(error)
      })
    })
  })

  function getDbConfig() {
    return new Mssql.Connection(dbConfig)
  }

  function prepareRequest(connection) {
    return new Mssql.Request(connection)
  }
}

module.exports = {
  connectToDb: connectToDb
}
