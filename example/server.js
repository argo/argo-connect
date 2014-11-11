var argo = require('argo');
var responseTime = require('response-time');
var adapter = require('../adapter');

argo()
  .use(adapter(responseTime()))
  .get('^/$', function(handle) {
    handle('request', function(env, next) {
      env.response.body = 'Hello World';
      next(env);
    });
  })
  .listen(3000);
