function config($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/partials/home.html'
  })
  .state('sign', {
    url: '/sign',
    templateUrl: '/partials/sign.html'
  })
    .state('sign.in', {
      url: '/in',
      parent: 'sign',
      templateUrl: '/partials/_in.html',
      controller: 'SignInController',
      controllerAs: 'ctrl'
    })
    .state('sign.up', {
      url: '/up',
      parent: 'sign',
      templateUrl: '/partials/_up.html',
      controller: 'SignUpController',
      controllerAs: 'ctrl'
    })
  .state('profile', {
    url: '/profile',
    template: '<div>profile</div>'
  });

  $httpProvider.interceptors.push('authInterceptor');
}

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

module.exports = config;