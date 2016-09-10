
module.exports.getAuthInfo = (methodArn) => {
  if (!methodArn) return null;

  const tmp = methodArn.split(':');
  const apiGatewayArnTmp = tmp[5].split('/');

  return {
    accountId: tmp[4],
    region: tmp[3],
    restApiId: apiGatewayArnTmp[0],
    stage: apiGatewayArnTmp[1],
    method: apiGatewayArnTmp[2],
  };
};


module.exports.getToken = (authorizationToken) => {
  if (!authorizationToken) return null;

  const tokenParts = authorizationToken.split(' ');
  return tokenParts[1];
};
