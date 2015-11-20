module.exports = function newDoc() {
  return {
    restrict: 'E',
    templateUrl: '/directives/new-doc.html',
    controllerAs: 'cardCtrl',
    require: ['Document', 'alert'],
    controller: function(Document, alert) {
      this.edit = false;
      this.submit = function() {
        Document.create(this.title)
        .success(res => {
          alert('success', 'Created', `New document ${res.title} was created.`);
        })
      }
    },
  }
}