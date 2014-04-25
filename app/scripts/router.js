App.Router.map(function () {
  this.resource('todos', function() {
    this.route('new');
  });
});
