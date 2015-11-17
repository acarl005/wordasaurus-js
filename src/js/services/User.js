module.exports = function userFactory($http) {
  return {
    create: function(info) {
      return $http.post('/users', info);
    },

    authenticate: function(info) {
      return $http.post('/sessions', info);
    }
  };
}