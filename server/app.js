//App configuration along with automated endpoint creation
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.development.config.js')

const isDeveloping = process.env.NODE_ENV !== 'production'

const fs = require('fs')
const app = express()

if (isDeveloping) {
  const compiler = webpack(webpackConfig)
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  // app.get('*', function response(req, res) {
  //   res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
  //   res.end()
  // })
} else {
  app.use(express.static(path.join(__dirname, '/dist')))
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  })
}

// an automated way of setting up endpoints, rather than having it all cluttered in one expressjs file
configureEndpoints(path.join(__dirname, '/modules'))

function configureEndpoints(path) {
  fs.readdirSync(path).forEach((file) => {
    const filePath = path + '/' + file
    const fileInfo = fs.statSync(filePath)
    if (fileInfo.isDirectory()) {
      configureEndpoints(filePath)
    }
    if (fileInfo.isFile()) {
      if (filePath.indexOf('endpoints') >= 0) {
        require(filePath)(app)
      }
    }
  })
}

// setup view to use HTML
// app.set('views', path.join(__dirname, 'views'))
// app.locals.title = "Edmodo"
// app.locals.email =  "kevin.roger.teng@gmail.com"
app.set('view engine', 'html')

module.exports = app
