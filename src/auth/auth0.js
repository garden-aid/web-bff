const jwt = require('jsonwebtoken');
const AuthPolicy = require('./policy').AuthPolicy;

module.exports.authorize = (token, secret, authInfo, cb) => {
  const options = {};

  return jwt.verify(token, secret, options, (err, identity) => {
    const username = identity ? identity.username : '';

    console.log(`Building policy for ${username} with: `, authInfo);

    const policy = new AuthPolicy(username, authInfo.accountId, authInfo);

    if (err) {
      console.log('Error verifing jwt', err);
      policy.denyAllMethods();
    } else {
      policy.allowMethod(AuthPolicy.HttpVerb.POST, '/graphql');
    }

    const result = policy.build();
    console.log('Returning auth result: ', result, result.policyDocument.Statement);

    return cb(null, result);
  });
};
