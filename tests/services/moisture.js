
'use strict';

const expect = require('chai').expect;
const BbPromise = require('bluebird');

const moistureService = require('../../src/services/moisture');

const mockResponse = {
  Count: 2,
  Items: [{
    attrs: {
      ClientId: 'test-client',
      Timestamp: '1470089804289',
      Data: {
        DeviceId: 'test-blah',
        Level: 1.1,
        Recorded: '2016-08-01T22:16:43.642Z',
      },
    },
  }, {
    attrs: {
      ClientId: 'test-client',
      Timestamp: '1470089804032',
      Data: {
        DeviceId: 'test-blah',
        Level: 0.4,
        Recorded: '2016-08-01T22:16:43.641Z',
      },
    },
  }],
};

const mockMoisture = {
  gte: () => this,
  query: () => this,
  execAsync: () => BbPromise.resolve(mockResponse),
};

describe('MoistureService', () => {
  it('requires moisture table', () => {
    expect(() => moistureService()).to.throw(Error);
  });

  describe('#convertResults()', () => {
    it('converts results', () => {
      const moisture = moistureService({ moistureTable: mockMoisture });
      const result = moisture.convertResults(mockResponse.Items);

      expect(result).to.deep.equal([{
        date: '2016-08-01T22:16:43.642Z',
        moisture: 1.1,
      }, {
        date: '2016-08-01T22:16:43.641Z',
        moisture: 0.4,
      }]);
    });
  });

  describe('#logResults()', () => {
    it('converts results', () => {
      const moisture = moistureService({ moistureTable: mockMoisture });
      expect(() => moisture.logResults(mockResponse))
        .to.not.throw();
    });
  });
});
