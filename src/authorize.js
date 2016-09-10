'use strict';

const AuthPolicy = require('./auth/policy').AuthPolicy;

module.exports.handler = function(event, context, cb) {
  console.log('Received event', event);

  policy.denyAllMethods();

  //policy.allowAllMethods();
  // Or define subset based on scop - verifiedJwt.body.scope
  //policy.allowMethod(AuthPolicy.HttpVerb.GET, "*");
  //policy.allowMethod(AuthPolicy.HttpVerb.POST, "/users/" + verifiedJwt.body.sub);

  const result = policy.build();
  console.log('Returning auth result: ', result, result.policyDocument.Statement);

  return cb(null, result);
};
