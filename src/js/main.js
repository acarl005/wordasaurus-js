window.jQuery = window.$ = require('jquery');
require('bootstrap');

var angular = require('angular');
require('angular-ui-router');
require('angular-animate');


angular.module('wordasaurus', ['ui.router', 'ngAnimate'])

.config(require('./config'))

.controller('HomeController', require('./controllers/home-controller'))
.controller('NavController', require('./controllers/nav-controller'))
.controller('SignInController', require('./controllers/sign-in-controller'))
.controller('SignUpController', require('./controllers/sign-up-controller'))
.controller('ProfileController', require('./controllers/profile-controller'))
.controller('EditorController', require('./controllers/editor-controller'))

.directive('validateEquals', require('./directives/validate-equals'))
.directive('docCard', require('./directives/doc-card'))
.directive('newDoc', require('./directives/new-doc'))
.directive('imageText', require('./directives/image-text'))

.service('alert', require('./services/alert'))
.factory('User', require('./services/user-factory'))
.factory('Document', require('./services/document-factory'))
.factory('Synonym', require('./services/synonym-factory'))
.factory('authToken', require('./services/auth-token'))
.factory('authInterceptor', require('./services/auth-interceptor'));
