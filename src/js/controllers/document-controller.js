function DocumentController(Document, alert) {

  Document.get()
  .success(data => {
    this.docs = data;
  }).error(err => {
    alert('danger', 'Error', err.message);
  });
}

DocumentController.$inject = ['Document', 'alert'];

module.exports = DocumentController;