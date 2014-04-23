var Lab = require('lab');
var server = require('../server/lib');

var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;
var describe = Lab.experiment;
var it = Lab.test;

describe('Ember app static files', function() {
  it('serves up index.html', function (done) {
    server.inject('/index.html', function(res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
