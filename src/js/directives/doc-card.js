module.exports = function docCard() {
  return {
    resctrict: 'E',
    scope: {
      doc: '='
    },
    templateUrl: '/directives/doc-card.html',
    controller: ['$scope', 'Document', function($scope, Document) {
      $scope.delete = () => {
        Document.destroy($scope.doc._id).then(res => {
          $scope.$parent.$parent.ctrl.removeDoc($scope.doc._id);
        });
      };
    }]
  };
};
