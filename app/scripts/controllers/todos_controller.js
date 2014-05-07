App.TodosController = Ember.ArrayController.extend({
  newTodo: '',
  completed: Ember.computed.filterBy('content', 'complete', true),

  hasCompleted: function() {
    return this.get('completed').get('length') > 0;
  }.property('model.@each.complete'),

  actions: {
    createTodo: function() {
      var todo = this.store.createRecord('todo', {
        title: this.get('newTodo')
      });

      var controller = this;

      todo.save().then(function(theTodo) {
        controller.set('newTodo', '');
      });
    },

    deleteTodo: function(todo) {
      todo.destroyRecord();
    },

    clearCompleted: function() {
      var completed = this.get('completed');
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  }
});
