function HomeController(User) {
  this.getUser = User.current;
}

HomeController.$inject = ['User'];

module.exports = HomeController;