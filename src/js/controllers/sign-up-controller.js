function SignUpController(User, alert, $state) {
  this.submit = function() {
    var user = { 
      email: this.email,
      password: this.password
    };
    User.create(user)
    .success(res => {
      alert('success', 'Registered', 'Welcome to Wordasaurus');
      $state.go('home');
    })
    .error(err => {
      alert('danger', 'Error', err.message);
    });
  }
}

SignUpController.$inject = ['User', 'alert', '$state'];

module.exports = SignUpController;