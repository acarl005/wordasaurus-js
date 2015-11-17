module.exports = function SignInController(alert) {
  this.submit = function() {
    var user = {
      email: this.email,
      password: this.password
    };
    console.log(user);
    alert('success', 'yay', 'submitted');
  }
}