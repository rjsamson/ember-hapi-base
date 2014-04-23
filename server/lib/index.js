var Hapi = require('hapi');

var server = Hapi.createServer('localhost', 8000);

server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: { path: './dist', listing: false, index: true }
  }
});

module.exports = server;

server.start();
