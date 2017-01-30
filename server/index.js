const app = require('./app.js')
const config = require('./config.js')
const logger = require('winston')

app.listen(config.port, (error) => {
  if (error) {
    logger.log('error', error)
  }
  logger.log('info', 'Server is running at localhost:' + config.port)
})

module.exports = app
