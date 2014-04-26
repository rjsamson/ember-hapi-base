// Placehold showing handler structure
// Stupid example using in memory array as data store

var todos = [
  { id: 1, title: "Learn Hapi", complete: false },
  { id: 2, title: "Learn Ember", complete: false }
];

exports.IndexHandler = function(request, reply) {
  reply({todos: todos});
};

exports.CreateHandler = function(request, reply) {
  var newTodo = JSON.parse(request.payload);

  if (typeof newTodo.title !== undefined) {
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

  var title = updatedTodo.title;
  var complete = updatedTodo.complete;

  if(typeof updatedTodo.title !== undefined) {
    todos[index].title = updatedTodo.title;
  }

  if(typeof updatedTodo.complete !== undefined) {
    todos[index].complete = updatedTodo.complete;
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
