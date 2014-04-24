// Placeholder showing route structure

var Todos = require('../handlers/todos');

module.exports = [
  {
    method: 'GET',
    path: '/api/v1/todos',
    handler: Todos.IndexHandler
  },
  {
    method: 'POST',
    path: '/api/v1/todos',
    handler: Todos.CreateHandler
  },
  {
    method: 'GET',
    path: '/api/v1/todos/{todo_id}',
    handler: Todos.ShowHandler
  },
  {
    method: 'PUT',
    path: '/api/v1/todos/{todo_id}',
    handler: Todos.UpdateHandler
  },
  {
    method: 'DELETE',
    path: '/api/v1/todos/{todo_id}',
    handler: Todos.DeleteHandler
  }
];
