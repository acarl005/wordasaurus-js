module.exports = function newDoc() {
  return {
    restrict: 'E',
    templateUrl: '/directives/new-doc.html',
    controllerAs: 'cardCtrl',
    require: ['Document', 'alert', '$scope'],
    scope: {},
    controller: function(Document, alert, $scope) {
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
    },
  };
};
