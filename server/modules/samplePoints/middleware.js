const logger = require('winston')
const Q = require('q')
const sampleData = require('./samplejson.json')

const getAllData = (request, response) => {
  function queryAllDatas() {
    return Q.promise((resolve, reject) => {
      resolve(sampleData)
    }).catch((error) => {
      logger.info('error', error.body)
    })
  }

  return queryAllDatas()
}

module.exports = {
  getAllData : getAllData
}
