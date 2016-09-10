
module.exports.getAuthInfo = (methodArn) => {
  const tmp = methodArn.split(':');
  const apiGatewayArnTmp = tmp[5].split('/');

  return {
    accountId: tmp[4],
    region: tmp[3],
    stage: apiGatewayArnTmp[1],
    restApiId: apiGatewayArnTmp[0],
  };
};


module.exports.getToken = (authorizationToken) => {
  const tokenParts = authorizationToken.split(' ');
  return tokenParts[2];
};
