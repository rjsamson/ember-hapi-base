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
  var newTodo = request.payload.todo;

  if (typeof newTodo.title !== undefined) {
    newTodo.id = todos.length + 1;
    newTodo.complete = false;
    todos.push(newTodo);
  }

  console.log(newTodo);

  reply({todo: newTodo});
};

exports.ShowHandler = function(request, reply) {
  var index = parseInt(request.params.todo_id) - 1;

  reply({todos: [todos[index]]});
};

exports.UpdateHandler = function(request, reply) {
  var index = parseInt(request.params.todo_id) - 1;
  var updatedTodo = request.payload.todo;

  var title = updatedTodo.title;
  var complete = updatedTodo.complete;

  if(typeof updatedTodo.title !== undefined) {
    todos[index].title = updatedTodo.title;
  }

  if(typeof updatedTodo.complete !== undefined) {
    todos[index].complete = updatedTodo.complete;
  }

  reply({todo: todos[index]});
};

exports.DeleteHandler = function(request, reply) {
  var index = parseInt(request.params.todo_id) - 1;

  todos.splice(index, 1);

  console.log(todos[index]);
  reply({success: true});
};
