function config($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('authInterceptor');

  $urlRouterProvider.otherwise('/404');
  $urlRouterProvider.when('', '/');
  $urlRouterProvider.when('/sign', '/sign/in');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/partials/home.html',
    controller: 'HomeController',
    controllerAs: 'ctrl'
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
    templateUrl: '/partials/profile.html',
    controller: 'ProfileController',
    controllerAs: 'ctrl'
  })
  .state('document', {
    url: '/documents/:id',
    templateUrl: '/partials/editor.html',
    controller: 'EditorController',
    controllerAs: 'ctrl'
  })
  .state('404', {
    url: '/404',
    template: '<div class="container"><h1>404 Error</h1></div>'
  });
}

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

module.exports = config;
