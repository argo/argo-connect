var argo = require('argo');
var request = require('supertest');
var adapter = require('../adapter');

var middleware = function(req, res, next) {
  res.setHeader('X-Sample-Middleware', 'argo-connect works!');
  next();
};

var app = argo()
  .use(adapter(middleware))
  .get('^/$', function(handle) {
    handle('request', function(env, next) {
      env.response.body = 'Hello World';
      next(env);
    });
  })
  .build().run;

describe('Adapter', function() {
  it('runs connect compatible middleware', function(done) {
    request(app)
      .get('/')
      .expect('X-Sample-Middleware', 'argo-connect works!')
      .end(done);
  });

  it('runs fires the next callback in the Argo handler', function(done) {
    request(app)
      .get('/')
      .expect(200, 'Hello World', done);
  });
});
