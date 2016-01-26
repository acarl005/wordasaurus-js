function DocumentFactory($http) {
  return {
    get: id => {
      var url = '/documents';
      if (id) url += '/' + id;
      return $http.get(url);
    },
    create: title => {
      return $http.post('/documents', { title });
    },
    destroy: id => {
      return $http.delete('/documents/' + id);
    },
    put: doc => {
      return $http.put('/documents/' + doc._id, { body: doc.body });
    }
  };
}

DocumentFactory.$inject = ['$http'];

module.exports = DocumentFactory;
