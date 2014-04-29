var server = require('./server');

server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: { path: './dist', listing: false, index: true }
  }
});

module.exports = server;

server.start();
