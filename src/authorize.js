
const AuthPolicy = require('./auth/policy').AuthPolicy;

module.exports.handler = (event, context, cb) => {
  console.log('Received event', event);

  const apiOptions = {};
  const tmp = event.methodArn.split(':');
  const apiGatewayArnTmp = tmp[5].split('/');
  const awsAccountId = tmp[4];
  apiOptions.region = tmp[3];
  apiOptions.restApiId = apiGatewayArnTmp[0];
  apiOptions.stage = apiGatewayArnTmp[1];

  console.log('Building with policy with: ', awsAccountId, apiOptions);

  const policy = new AuthPolicy('', awsAccountId, apiOptions);
  policy.denyAllMethods();

  // policy.allowAllMethods();
  // Or define subset based on scop - verifiedJwt.body.scope
  // policy.allowMethod(AuthPolicy.HttpVerb.GET, "*");
  // policy.allowMethod(AuthPolicy.HttpVerb.POST, "/users/" + verifiedJwt.body.sub);

  const result = policy.build();
  console.log('Returning auth result: ', result, result.policyDocument.Statement);

  return cb(null, result);
};
