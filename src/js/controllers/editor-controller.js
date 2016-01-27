function EditorController($stateParams, Document, alert) {
  this.edit = false;
  Document.get($stateParams.id)
  .success(doc => {
    this.doc = doc;
  })
  .error(err => {
    alert('danger', 'Error', err.message);
  });
  this.save = () => {
    Document.put(this.doc)
    .success(() => {
      alert('success', 'Saved');
    })
    .error(err => {
      alert('danger', 'Error', err.message);
    });
  };
  this.setActive = (word, i) => {
    console.log(word, i);
  };
}

EditorController.$inject = ['$stateParams', 'Document', 'alert'];

module.exports = EditorController;
