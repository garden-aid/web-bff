
'use strict';

const expect        = require('chai').expect;
const sinon         = require('sinon');

const env = require('../env');

let envPlaceholder = {};

describe('#env()', () => {
  before(function() {
    envPlaceholder = process.env;
    process.env = {};
  });

  after(function() {
    process.env = envPlaceholder;
  });

  it('should set env vars', () => {
    const config = {
      a: 'item',
      b: true
    };

    env(config);

    expect(process.env).to.deep.equal(config);
  });

  it('should set secure env vars', () => {
    const config = {
      a: 'item',
      b: true
    };

    env(config, true);

    expect(process.env).to.deep.equal(config);
  });
});
