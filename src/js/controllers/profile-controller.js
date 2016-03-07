function ProfileController($scope, Document, alert) {

  this.loading = true;

  Document.get()
  .success(data => {
    this.loading = false;
    this.docs = data;
  }).error(err => {
    this.loading = false;
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
