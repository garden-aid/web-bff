
const AuthPolicy = require('./policy').AuthPolicy;

module.exports.authorize = (token, auth0Client, authInfo) =>
  auth0Client.getInfo(token)
    .then((userInfo) => {
      if (!userInfo || !userInfo.user_id) {
        throw new Error('No user_id returned from Auth0');
      }

      console.log(`Building policy for ${userInfo.user_id} with: `, authInfo);

      const policy = new AuthPolicy(userInfo.user_id, authInfo.accountId, authInfo);

      policy.allowMethod(AuthPolicy.HttpVerb.POST, '/graphql');

      const result = policy.build();
      console.log('Returning auth result: ', result, result.policyDocument.Statement);

      return result;
    });
