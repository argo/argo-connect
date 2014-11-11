module.exports = function(middleware) {
  return function(handle) {
    handle('request', function(env, next) {
      var nextFunc = function() {
        next(env);
      };
      middleware.call(null, env.request, env.response, nextFunc);
    });
  }
};
