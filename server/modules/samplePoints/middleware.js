const logger = require('winston')
const Q = require('q')
const {connectToDb} = require('../../database/config.js')
const sampleData = require('./samplejson.json')

const getAllData = (request, response) => {
  function queryAllDatas() {
    return Q.promise((resolve, reject) => {
      connectToDb(request, response).then((res) => {
        resolve(res)
      })
    }).catch((error) => {
      logger.info('error', error.body)
    })
  }

  return queryAllDatas()
}

module.exports = {
  getAllData: getAllData
}
