
'use strict';

const expect        = require('chai').expect;
const sinon         = require('sinon');
const lambdaWrapper = require('lambda-wrapper');
const BbPromise     = require('bluebird');

const graphqlLambda = require('../src/graphql');
const schemaFactory = require('../src/query/schema');
const DayService = require('../src/services/dayService');

describe('#handler()', () => {
  beforeEach(() => {
    const mockDayTable = {
      gte: function () {
        return this;
      },
      query: function () {
          return this;
      },
      execAsync: () => {
        return BbPromise.resolve({
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
        });
      }
    };

    const dayService = new DayService(mockDayTable);
    const schema = schemaFactory(dayService);

    sinon.stub(graphqlLambda, 'getSchema').returns(schema);
  });

  it('return data', function(done) {
    const event = {
      body: {
        query: `{
          day {
            date, moisture
          }
        }`
      },
    };

    graphqlLambda.handler(event, {}, function(err, result) {
      if (err) throw err;
      expect(result).to.deep.equal({
        data: {
          day: [{
            "date": '2016-08-01T22:16:43.642Z',
            "moisture": 1.1
          },{
            "date": '2016-08-01T22:16:43.641Z',
            "moisture": 0.4
          }]
        }
      });

      done();
    })
    .catch(done);
  });
});
