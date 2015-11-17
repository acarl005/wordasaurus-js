module.exports = function SignUpController() {
  this.submit = function() {
    var user = { 
      email: this.email,
      password: this.password
    };
    console.log(user);
  }
}