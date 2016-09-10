const jwt = require('jsonwebtoken');
const AuthPolicy = require('./policy').AuthPolicy;

module.exports.authorize = (token, secret, authInfo, cb) => {
  const options = {};

  return jwt.verify(token, secret, options, (err, identity) => {
    if (err) return cb(err);

    console.log(`Building policy for ${identity.username} with: `, authInfo);

    const policy = new AuthPolicy(identity.username, authInfo.accountId, authInfo);
    policy.denyAllMethods();

    // policy.allowAllMethods();
    // Or define subset based on scop - verifiedJwt.body.scope
    // policy.allowMethod(AuthPolicy.HttpVerb.GET, "*");
    // policy.allowMethod(AuthPolicy.HttpVerb.POST, "/users/" + verifiedJwt.body.sub);

    const result = policy.build();
    console.log('Returning auth result: ', result, result.policyDocument.Statement);

    return cb(null, result);
  });
};
