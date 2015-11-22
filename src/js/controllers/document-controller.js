function DocumentController($stateParams, Document, alert) {
  console.log($stateParams);
  Document.get($stateParams.id)
  .success(doc => {
    this.doc = doc;
  })
  .error(err => {
    alert('danger', 'Error', err.message);
  })
}

DocumentController.$inject = ['$stateParams', 'Document', 'alert'];

module.exports = DocumentController;