function NavController(alert, $state, User) {
  this.getUser = User.current;
  this.logOut = function() {
    User.logout();
    alert('success', 'Logged out', 'Have a nice day!');
    $state.go('sign.in');
  }
}

NavController.$inject = ['alert', '$state', 'User'];

module.exports = NavController;