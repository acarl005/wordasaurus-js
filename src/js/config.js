module.exports = function config($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    template: '<main>home</main>'
  })
  .state('sign', {
    url: '/sign',
    templateUrl: '/partials/sign.html'
  })
    .state('sign.in', {
      url: '/in',
      parent: 'sign',
      templateUrl: '/partials/_in.html',
      controller: require('./controllers/sign-in'),
      controllerAs: 'ctrl'
    })
    .state('sign.up', {
      url: '/up',
      parent: 'sign',
      templateUrl: '/partials/_up.html',
      controller: require('./controllers/sign-up'),
      controllerAs: 'ctrl'
    });

  // $httpProvider.interceptors.push('authInterceptor');
}