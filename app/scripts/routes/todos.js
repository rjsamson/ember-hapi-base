App.TodosRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON('/api/v1/todos');
  }
});
