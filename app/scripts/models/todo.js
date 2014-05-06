App.Todo = DS.Model.extend({
  title: DS.attr('string'),
  complete: DS.attr('boolean'),
  // Not sure if this is the best way to do this...
  toggleComplete: function() {
    if(this.get('isDirty')) {
      this.save();
    }
  }.observes('complete')
});
