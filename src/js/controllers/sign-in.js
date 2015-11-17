module.exports = function SignInController(User, authToken, alert) {
  this.submit = function() {
    var user = {
      email: this.email,
      password: this.password
    };
    User.authenticate(user)
    .success(token => {
      authToken.set(token);
      alert('success', 'Logged in', 'Welcome back to Wordasaurus');
    })
    .error(err => {
      alert('danger', 'Error', err.message);
    });
  }
}