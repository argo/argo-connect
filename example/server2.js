var argo = require('argo');
var adapter = require('../adapter');

var middleware = function(req, res, next) {
  res.setHeader('X-Sample-Middleware', 'argo-connect works!');
  next();
};

argo()
  .use(adapter(middleware))
  .get('^/$', function(handle) {
    handle('request', function(env, next) {
      env.response.body = 'Hello World';
      next(env);
    });
  })
  .listen(3000);

