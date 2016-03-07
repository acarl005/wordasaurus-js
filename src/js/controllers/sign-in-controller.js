function SignInController(User, alert, $state) {
  this.submit = function() {
    var user = {
      email: this.email,
      password: this.password
    };
    User.authenticate(user)
    .success(res => {
      alert('success', 'Logged in', 'Welcome back to Wordasaurus');
      $state.go('profile');
    })
    .error(err => {
      alert('danger', 'Error', err.message);
    });
  };
}

SignInController.$inject = ['User', 'alert', '$state'];

module.exports = SignInController;
