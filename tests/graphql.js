
'use strict';

const expect        = require('chai').expect;
const sinon         = require('sinon');
const lambdaWrapper = require('lambda-wrapper');
const BbPromise     = require('bluebird');

const graphqlLambda = require('../src/graphql');
const schemaFactory = require('../src/query/schema');
const DayService    = require('../src/services/day');

const mockData = [{
  "date": '2016-08-01T22:16:43.642Z',
  "moisture": 1.1
},{
  "date": '2016-08-01T22:16:43.641Z',
  "moisture": 0.4
}];

describe('#handler()', () => {
  beforeEach(() => {
    const dayService = {
      getLastHours() {
          return mockData;
      }
    };
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
          day: mockData
        }
      });

      done();
    })
    .catch(done);
  });
});
