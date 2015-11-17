module.exports = function SignUpController(User, authToken, alert) {
  this.submit = function() {
    var user = { 
      email: this.email,
      password: this.password
    };
    User.create(user)
    .success(res => {
      authToken.set(res.token);
      alert('success', 'Registered', 'Welcome to Wordasaurus');
    })
    .error(err => {
      alert('danger', 'Error', err.message);
    });
  }
}