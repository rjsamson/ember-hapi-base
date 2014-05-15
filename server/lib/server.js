var Hapi = require('hapi');
var server = Hapi.createServer('localhost', 8000);

// Setup auth
var AuthHandlers = require('./handlers/auth');

server.pack.require('hapi-auth-cookie', function(err) {
  server.auth.strategy('session', 'cookie', {
    // replace this, or better yet get it from a config file not checked into git!
    password: 'supersecrettoken',
    cookie: 'hapi-ember-base-sid',
    isSecure: false
  });
});

// Routes to manage the session

server.route([
  { method: 'POST', path: '/session', config: { handler: AuthHandlers.Login, auth: { mode: 'try' } } },
  { method: 'DELETE', path: '/session', config: { handler: AuthHandlers.Logout, auth: true } }
]);

// Setup routes
var todos = require('./routes/todos');
server.route(todos);

module.exports = server;
