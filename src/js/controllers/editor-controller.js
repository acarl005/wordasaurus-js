function EditorController($stateParams, Document, Synonym, alert) {
  this.edit = true;
  this.space = /\s+/;
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
    .then(
      syns => {
        this.syns = syns.data;
      },
      err => {
        alert('danger', 'Error', err.data.message);
        this.syns = null;
      }
    );
  };
  this.replaceActive = word => {
    var body = this.doc.body.split(/\s+/);
    var oldWord = body[this.activeIndex];
    console.log(body[this.activeIndex], oldWord, oldWord.replace(/\w+/, word));
    body[this.activeIndex] = oldWord.replace(/\w+/, word);
    console.log(body[this.activeIndex], oldWord, oldWord.replace(/\w+/, word));
    this.doc.body = body.join(' ');
    this.activeIndex = null;
    this.syns = null;
  };
}

EditorController.$inject = ['$stateParams', 'Document', 'Synonym', 'alert'];

module.exports = EditorController;
