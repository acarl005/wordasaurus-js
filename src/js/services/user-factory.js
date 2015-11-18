function userFactory($http, authToken) {
  var currentUser;
  return {
    create: function(info) {
      return $http.post('/users', info)
      .success(res => {
        authToken.set(res.token);
      });
    },

    authenticate: function(info) {
      return $http.post('/sessions', info)
      .success(res => {
        authToken.set(res.token);
      });
    },

    current: function() {
      if (!currentUser) {
        var jwt = authToken.get();
        if (!jwt) return null;
        var payload = jwt.split('.')[1];
        currentUser = JSON.parse(atob(payload));
      }
      return currentUser;
    },

    logout: function() {
      currentUser = null;
      authToken.remove();
    }
  };
}

userFactory.$inject = ['$http', 'authToken'];

module.exports = userFactory;