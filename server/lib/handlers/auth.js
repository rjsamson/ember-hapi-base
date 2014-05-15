// Hard coded user for demo purposes

var users = {
  admin: {
    id: 'admin',
    password: 'password',
    name: 'Admin'
  }
}

exports.Login = function(request, reply) {
  if (request.auth.isAuthenticated) {
    return reply({success: true});
  }

  var account = null;

  if (!request.payload.username || !request.payload.password) {
    return reply({error: "missing username or password"})
             .code(401);
  } else {
    account = users[request.payload.username];

    if (!account || account.password !== request.payload.password) {
      return reply({error: "invalid username or password"})
             .code(401);
    }
  }

  request.auth.session.set(account);
  return reply({success: true});
}

exports.Logout = function(request, reply) {
  request.auth.session.clear();
  return reply({success: true});
}
