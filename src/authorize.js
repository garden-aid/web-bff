
const utils = require('./auth/utils');
const auth0 = require('./auth/auth0');
const AuthenticationClient = require('auth0').AuthenticationClient;

const authClient = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
});

module.exports.handler = (event, context, cb) => {
  console.log('Received event', event);

  const token = utils.getToken(event.authorizationToken);

  if (!token) {
    return cb('Missing token from event');
  }

  const authInfo = utils.getAuthInfo(event.methodArn);

  return auth0.authorize(token, authClient, authInfo)
    .then((result) => cb(null, result))
    .catch((err) => cb(err));
};
