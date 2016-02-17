function EditorController($stateParams, Document, Synonym, alert) {
  this.edit = true;
  Document.get($stateParams.id)
  .success(doc => {
    this.doc = doc;
  })
  .error(err => {
    alert('danger', 'Error', err.message);
  });
  this.save = () => {
    Document.update(this.doc)
    .success(() => {
      alert('success', 'Saved');
    })
    .error(err => {
      alert('danger', 'Error', err.message);
    });
  };
  this.setActive = (word, i) => {
    this.activeIndex = i;
    Synonym.get(word)
    .success(syns => {
      this.syns = syns;
    })
    .error(err => {
      alert('danger', 'Error', err.message);
      this.syns = null;
    });
  };
  this.replaceActive = word => {
    var body = this.doc.body.split(' ');
    body[this.activeIndex] = word;
    this.doc.body = body.join(' ');
    this.activeIndex = null;
    this.syns = null;
  };
}

EditorController.$inject = ['$stateParams', 'Document', 'Synonym', 'alert'];

module.exports = EditorController;
