module.exports = function newDoc() {
  return {
    restrict: 'E',
    templateUrl: '/directives/new-doc.html',
    controllerAs: 'cardCtrl',
    scope: {},
    controller: ['$scope', 'Document', 'alert', function($scope, Document, alert) {
      this.edit = false;
      this.submit = function() {
        Document.create(this.title)
        .success(res => {
          alert('success', 'Created', `New document ${res.title} was created.`);
          $scope.$parent.ctrl.addDoc(res);
          this.title = '';
          this.edit = false;
        });
      };
    }],
  };
};
