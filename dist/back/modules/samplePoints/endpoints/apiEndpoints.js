'use strict';

module.exports = function (app) {
  var samplePointService = require('../middleware.js');

  app.get('/api/getAllData', function (request, response) {
    samplePointService.getAllData(request, response).then(function (res) {
      response.json(res);
    }).catch(response.error).done();
  });
};