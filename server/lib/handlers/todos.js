// Placehold showing handler structure
// Stupid example using in memory array as data store

var todos = [ { id: 1, title: "Learn Hapi" }, { id: 2, title: "Learn Ember" } ];

exports.IndexHandler = function(request, reply) {
  reply({todos: todos});
};

exports.CreateHandler = function(request, reply) {
  var newTodo = JSON.parse(request.payload);

  if (newTodo.title) {
    newTodo.id = todos.length + 1;
    todos.push(newTodo);
  }

  console.log(newTodo);

  reply({success: true});
};

exports.ShowHandler = function(request, reply) {
  var index = parseInt(request.params.todo_id) - 1;

  reply({todos: [todos[index]]});
};

exports.UpdateHandler = function(request, reply) {
  var index = parseInt(request.params.todo_id) - 1;
  var updatedTodo = JSON.parse(request.payload);

  if(updatedTodo.title) {
    todos[index].title = updatedTodo.title;
  }

  console.log(request.payload);
  reply({success: true});
};

exports.DeleteHandler = function(request, reply) {
  var index = parseInt(request.params.todo_id) - 1;

  todos.splice(index, 1);

  console.log(todos[index]);
  reply({success: true});
};
