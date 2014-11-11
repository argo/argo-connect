# argo-connect

An adapter for wrapping connect middleware for use in [Argo](https://github.com/argo/argo).

[![Build Status](https://api.travis-ci.org/argo/argo-connect.svg?branch=master)](https://travis-ci.org/argo/argo-connect)

## Install

`npm install argo-connect`

## Usage

Wrap any connect middleware in the argo-connect adapter.

```js
var argo = require('argo');
var adapter = require('argo-connect');

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
```

## License

MIT
