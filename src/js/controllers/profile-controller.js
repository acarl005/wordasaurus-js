function ProfileController($scope, Document, alert) {

  Document.get()
  .success(data => {
    this.docs = data;
  }).error(err => {
    alert('danger', 'Error', err.message);
  });

  this.addDoc = doc => {
    this.docs.push(doc);
  };

  this.removeDoc = id => {
    for (var i = 0; i < this.docs.length; i++) {
      if (this.docs[i]._id === id) {
        this.docs.splice(i, 1);
      }
    }
  };
}

ProfileController.$inject = ['$scope', 'Document', 'alert'];

module.exports = ProfileController;
