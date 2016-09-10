
const utils = require('./auth/utils');
const auth0 = require('./auth/auth0');

module.exports.handler = (event, context, cb) => {
  const token = utils.getToken(event.authorizationToken);

  if (!token) {
    return cb('Missing token from event');
  }

  const authInfo = utils.getAuthInfo(event.methodArn);
  const secret = process.env.AUTH0_CLIENT_SECRET;

  return auth0.authorize(token, secret, authInfo, cb);
};
