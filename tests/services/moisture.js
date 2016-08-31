
'use strict';

const expect        = require('chai').expect;
const sinon         = require('sinon');
const lambdaWrapper = require('lambda-wrapper');
const BbPromise     = require('bluebird');

const MoistureService = require('../../src/services/moisture');


const mockResponse = {
  Count: 2,
  Items: [{
    attrs: {
      ClientId: 'test-client',
      Timestamp: '1470089804289',
      Data: {
        DeviceId: 'test-blah',
        Level: 1.1,
        Recorded: '2016-08-01T22:16:43.642Z'
      },
    }
  }, {
    attrs: {
      ClientId: 'test-client',
      Timestamp: '1470089804032',
      Data: {
        DeviceId: 'test-blah',
        Level: 0.4,
        Recorded: '2016-08-01T22:16:43.641Z'
      },
    }
  }]
};

const mockMoisture = {
  gte: function () {
    return this;
  },
  query: function () {
      return this;
  },
  execAsync: () => {
    return BbPromise.resolve(mockResponse);
  }
};

describe('MoistureService', () => {
  it('requires moisture table', function() {
    expect(() => MoistureService()).to.throw(Error);
  });

  describe('#convertResults()', () => {
    it('converts results', function() {
      const moistureService = MoistureService({ moistureTable: mockMoisture });
      const result = moistureService.convertResults(mockResponse.Items);

      expect(result).to.deep.equal([{
        "date": '2016-08-01T22:16:43.642Z',
        "moisture": 1.1
      },{
        "date": '2016-08-01T22:16:43.641Z',
        "moisture": 0.4
      }]);
    });
  });

  describe('#logResults()', () => {
    it('converts results', function() {
      const moistureService = MoistureService({ moistureTable: mockMoisture });
      expect(() => moistureService.logResults(mockResponse)).to.not.throw;
    });
  });
});
