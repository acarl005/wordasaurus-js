function SynonymFactory($http) {
  return {
    get: word => {
      return $http.get('/synonyms/' + word);
    }
  };
}

SynonymFactory.$inject = ['$http'];

module.exports = SynonymFactory;
