function EditorController($stateParams, Document, Synonym, alert) {
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
    Synonym.get(word)
    .success(syns => {
      console.log(syns);
    })
    .error(err => {
      alert('danger', 'Error', err.message);
    });
  };
}

EditorController.$inject = ['$stateParams', 'Document', 'Synonym', 'alert'];

module.exports = EditorController;
