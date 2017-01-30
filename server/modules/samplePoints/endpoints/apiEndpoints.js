const logger = require('winston')
module.exports = (app) => {
  const samplePointService = require('../middleware.js')

  app.get('/api/getAllData', (request, response) => {
    samplePointService.getAllData(request, response)
      .then((res) => { response.json(res) })
      .catch(response.error)
      .done()
  })
}
