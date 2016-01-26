module.exports = function validateEquals() {
  return {
    require: 'ngModel',
    link: function(scope, el, attrs, ngModelCtrl) {
      ngModelCtrl.$parsers.push(value => {
         var valid = (value === scope.$eval(attrs.validateEquals));
         ngModelCtrl.$setValidity('equal', valid);
         return value;
      });
    }
  };
};
