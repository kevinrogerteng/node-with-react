const app = require('./server/app')
const config = require('./server/config')
const logger = require('winston')

app.listen(config.port, (error) => {
  if (error) {
    logger.log('error', error)
  }
  logger.log('info', 'Server is running at localhost:' + config.port)
})

module.exports = app
