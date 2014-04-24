var Hapi = require('hapi');
var server = Hapi.createServer('localhost', 8000);

var todos = require('./routes/todos');
server.route(todos);

module.exports = server;
