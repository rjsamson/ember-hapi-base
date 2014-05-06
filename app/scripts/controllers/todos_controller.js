App.TodosController = Ember.ArrayController.extend({
  newTodo: '',
  actions: {
    createTodo: function() {
      var todo = this.store.createRecord('todo', {
        title: this.get('newTodo')
      });

      var controller = this;

      todo.save().then(function(todo) {
        controller.set('newTodo', '');
        controller.get('model.todos').addObject(todo);
      });
    }
  }
});
