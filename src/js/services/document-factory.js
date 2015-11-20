function DocumentFactory($http) {
  return {
    get: () => {
      return $http.get('/documents');
    },
    create: title => {
      return $http.post('/documents', { title });
    }
  }
}

DocumentFactory.$inject = ['$http'];

module.exports = DocumentFactory