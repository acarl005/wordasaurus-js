module.exports = function docCard() {
  return {
    resctrict: 'E',
    scope: {
      doc: '='
    },
    templateUrl: '/directives/doc-card.html',
    controller: ['$scope', 'Document', function($scope, Document) {
      $scope.delete = () => {
        if (confirm('Are you sure you want to delete this forever?')) {
          Document.destroy($scope.doc._id).then(res => {
            $scope.$parent.$parent.ctrl.removeDoc($scope.doc._id);
          });
        }
      };
    }]
  };
};
