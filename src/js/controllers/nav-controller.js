module.exports = function NavController(authToken, alert) {
  this.loggedIn = authToken.exists;
  this.logOut = function() {
    authToken.remove();
    alert('success', 'Logged out', 'Have a nice day!');
  }
}