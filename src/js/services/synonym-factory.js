function SynonymFactory($http, $q) {
  return {
    get: word => {
      var match = word.match(/\w+/);
      if (!match) {
        return $q((resolve, reject) => {
          reject({ message: 'No synonyms for ' + word});
        });
      }
      return $http.get('/synonyms/' + match[0]);
    }
  };
}

SynonymFactory.$inject = ['$http', '$q'];

module.exports = SynonymFactory;
