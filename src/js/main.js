window.jQuery = window.$ = require('jquery');
require('bootstrap');

var angular = require('angular');
require('angular-ui-router');
require('angular-animate');


angular.module('wordasaurus', ['ui.router', 'ngAnimate'])

.config(require('./config'))

.controller('NavController', require('./controllers/nav-controller'))
.controller('SignInController', require('./controllers/sign-in-controller'))
.controller('SignUpController', require('./controllers/sign-up-controller'))

.directive('validateEquals', require('./directives/validate-equals'))

.service('alert', require('./services/alert'))
.factory('User', require('./services/user-factory'))
.factory('authToken', require('./services/auth-token'))
.factory('authInterceptor', require('./services/auth-interceptor'));