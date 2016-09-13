'use strict';

const expect = require('chai').expect;

const utils = require('../../src/auth/utils');

describe('#utils()', () => {
  describe('#getToken()', () => {
    it('should return null for empty methodArn', () => {
      const token = utils.getToken('');
      expect(token).to.equal(null);
    });

    it('returns the token', () => {
      const token = 'token';
      expect(utils.getToken(`Bearer ${token}`)).to.equal(token);
    });
  });

  describe('#getAuthInfo()', () => {
    it('should return null for empty methodArn', () => {
      const authInfo = utils.getAuthInfo('');
      expect(authInfo).to.equal(null);
    });

    it('should return the auth info', () => {
      const accountId = '123456789012';
      const region = 'ap-southeast-2';
      const stage = 'dev';
      const restApiId = '4uv6m4qe3g';
      const method = 'POST';

      // eslint-disable-next-line max-len
      const methodArn = `arn:aws:execute-api:${region}:${accountId}:${restApiId}/${stage}/${method}/graphql`;
      const authInfo = utils.getAuthInfo(methodArn);

      expect(authInfo.accountId).to.equal(accountId);
      expect(authInfo.region).to.equal(region);
      expect(authInfo.stage).to.equal(stage);
      expect(authInfo.restApiId).to.equal(restApiId);
      expect(authInfo.method).to.equal(method);
    });
  });
});
