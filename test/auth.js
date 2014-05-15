var Lab = require('lab');
var server = require('../server/lib');

var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;
var describe = Lab.experiment;
var it = Lab.test;

describe('User authentication', function() {
  it('returns 401 with missing username / password', function (done) {
    server.inject({method: 'POST', url: '/session' }, function(res) {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });

  it('returns 401 with incorrect username / password', function (done) {
    var badCredentials = { username: 'wrong', password: 'username' };
    var options = {method: 'POST', url: '/session', payload: badCredentials};

    server.inject(options, function(res) {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });

  it('returns 200 with correct username / password', function (done) {
    var credentials = { username: 'admin', password: 'password' };
    var options = {method: 'POST', url: '/session', payload: credentials};

    server.inject(options, function(res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('returns 401 on logout if no user is logged in', function (done) {
    server.inject({method: 'DELETE', url: '/session'}, function(res) {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });

  it('logs a user out if they are logged in', function (done) {
    var credentials = { username: 'admin', password: 'password' };
    var options = {method: 'POST', url: '/session', payload: credentials};

    server.inject(options, function(res) {

      expect(res.statusCode).to.equal(200);

      var header = res.headers['set-cookie'];
      var cookie = header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);

      server.inject({method: 'DELETE', url: '/session', headers: { cookie: cookie[0] } }, function(res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

});

describe('Authenticated routes', function() {
  server.route({ method: 'GET',
                 path: '/testauth',
                 config: {
                  handler: function(request, reply) {
                    reply({authenticated: true});
                  },
                  auth: true }
  });

  it('returns 401 on logout if no user is logged in', function (done) {
    server.inject('/testauth', function(res) {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });

  it('returns 200 if a user is is logged in', function (done) {
    var credentials = { username: 'admin', password: 'password' };
    var options = {method: 'POST', url: '/session', payload: credentials};

    server.inject(options, function(res) {

      expect(res.statusCode).to.equal(200);

      var header = res.headers['set-cookie'];
      var cookie = header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);

      server.inject({method: 'GET', url: '/testauth', headers: { cookie: cookie[0] } }, function(res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});
