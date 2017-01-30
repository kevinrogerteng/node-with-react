'use strict';

//App configuration along with automated endpoint creation
require('dotenv').config();
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var isDeveloping = process.env.NODE_ENV !== 'production';

var fs = require('fs');
var app = express();

if (isDeveloping) {
  var webpackConfig = require('../webpack.development.config.js');
  var compiler = webpack(webpackConfig);
  var middleware = webpackMiddleware(compiler, {
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
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  // app.get('*', function response(req, res) {
  //   res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
  //   res.end()
  // })
} else {
  app.use(express.static(path.join(__dirname, '/dist/front')));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/front/index.html'));
  });
}

// an automated way of setting up endpoints, rather than having it all cluttered in one expressjs file
configureEndpoints(path.join(__dirname, '/modules'));

function configureEndpoints(path) {
  fs.readdirSync(path).forEach(function (file) {
    var filePath = path + '/' + file;
    var fileInfo = fs.statSync(filePath);
    if (fileInfo.isDirectory()) {
      configureEndpoints(filePath);
    }
    if (fileInfo.isFile()) {
      if (filePath.indexOf('endpoints') >= 0) {
        require(filePath)(app);
      }
    }
  });
}

// setup view to use HTML
// app.set('views', path.join(__dirname, 'views'))
// app.locals.title = "Edmodo"
// app.locals.email =  "kevin.roger.teng@gmail.com"
app.set('view engine', 'html');

module.exports = app;