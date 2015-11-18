function authInterceptor(authToken) {
  return {
    request: function(config) {
      var token = authToken.get();
      if (token)
        config.headers.Authorization = token;
      return config;
    },
    response: function(res) {
      return res;
    }
  };
}

authInterceptor.$inject = ['authToken'];

module.exports = authInterceptor;