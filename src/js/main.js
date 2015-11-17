window.jQuery = window.$ = require('jquery');
require('bootstrap');

var angular = require('angular');
require('angular-ui-router');


angular.module('wordasaurus', ['ui.router'])

// .run(function($rootScope) {
//   $rootScope.$on('$stateChangeStart', 
//     function(event, toState, toParams, fromState, fromParams) {
//       console.log(toState);
//     }
//   );
// })

.config(require('./config'))

.controller('NavController', require('./controllers/nav-controller'))

.directive('validateEquals', require('./directives/validate-equals'))

.service('alert', require('./services/alert'))
.factory('User', require('./services/user-factory'))
.factory('authToken', require('./services/auth-token'));