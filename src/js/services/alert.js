function alert($rootScope, $timeout) {
  var alertTimeout;
  return function(type, title, message, timeout) {
    $rootScope.alert = {
      show: true,
      type: type,
      message: message,
      title: title,
    };
    $timeout.cancel(alertTimeout);
    alertTimeout = $timeout(function() {
      $rootScope.alert.show = false;
    }, timeout || 4000);
  }
}

alert.$inject = ['$rootScope', '$timeout'];

module.exports = alert;