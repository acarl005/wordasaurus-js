module.exports = function SignInController(User, authToken, alert) {
  this.submit = function() {
    var user = {
      email: this.email,
      password: this.password
    };
    User.authenticate(user)
    .success(res => {
      authToken.set(res.token);
      alert('success', 'Logged in', 'Welcome back to Wordasaurus');
    })
    .error(err => {
      alert('danger', 'Error', err.message);
    });
  }
}