module.exports = function NavController(authToken) {
  this.loggedIn = authToken.exists;
  this.logOut = authToken.remove;
}