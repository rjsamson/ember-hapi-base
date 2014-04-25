App.TodosRoute = Ember.Route.extend({
  model: function() {
    // return Ember.$.getJSON('/api/v1/todos');
    return this.store.find('todo');
  }
});
