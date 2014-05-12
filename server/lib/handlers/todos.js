// Placehold showing handler structure
// Stupid example using in memory array as data store
var _ = require('lodash');

var todos = [
  { id: 1, title: "Learn Hapi", complete: false },
  { id: 2, title: "Learn Ember", complete: false }
];

var nextId = 3;

exports.IndexHandler = function(request, reply) {
  reply({todos: todos});
};

exports.CreateHandler = function(request, reply) {
  var newTodo = request.payload.todo;

  if (typeof newTodo.title !== undefined) {
    newTodo.id = nextId;
    newTodo.complete = false;
    todos.push(newTodo);
    nextId += 1;
  }

  reply({todo: newTodo});
};

exports.ShowHandler = function(request, reply) {
  var todo_id = parseInt(request.params.todo_id);
  var todo = _.find(todos, {'id': todo_id});

  reply({todo: todo});
};

exports.UpdateHandler = function(request, reply) {
  var todo_id = parseInt(request.params.todo_id);
  var todo = _.find(todos, {'id': todo_id});
  var index = _.indexOf(todos, todo);

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
  var todo_id = parseInt(request.params.todo_id);

  var todo = _.find(todos, {'id': todo_id});

  todos = _.reject(todos, {'id': todo_id});

  reply({todo: todo});
};
