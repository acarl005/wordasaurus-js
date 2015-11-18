function authToken($window) {
  var storage = $window.localStorage;
  var cachedToken;
  var factory = {
    set: function(token) {
      cachedToken = token;
      storage.setItem('token', token);
    },
    get: function() {
      if (!cachedToken)
        cachedToken = storage.getItem('token');
      return cachedToken;
    },
    exists: function() {
      return factory.get();
    },
    remove: function() {
      cachedToken = null;
      storage.removeItem('token');
    }
  };
  return factory;
}

authToken.$inject = ['$window'];

module.exports = authToken;