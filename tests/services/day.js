
'use strict';

const expect        = require('chai').expect;
const sinon         = require('sinon');
const lambdaWrapper = require('lambda-wrapper');
const BbPromise     = require('bluebird');

const DayService = require('../../src/services/day');


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

const mockDay = {
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

describe('DayService', () => {
  it('requires day table', function() {
    expect(() => DayService()).to.throw(Error);
  });

  describe('#convertResults()', () => {
    it('converts results', function() {
      const dayService = DayService({ dayTable: mockDay });
      const result = dayService.convertResults(mockResponse.Items);

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
      const dayService = DayService({ dayTable: mockDay });
      expect(() => dayService.logResults(mockResponse)).to.not.throw;
    });
  });
});
