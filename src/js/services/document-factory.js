function DocumentFactory($http) {
  return {
    get: (id) => {
      var url = '/documents';
      if (id) url += '/' + id
      return $http.get(url);
    },
    create: title => {
      return $http.post('/documents', { title });
    }
  }
}

DocumentFactory.$inject = ['$http'];

module.exports = DocumentFactory