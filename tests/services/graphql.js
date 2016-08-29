
'use strict';

const expect        = require('chai').expect;
const sinon         = require('sinon');
const BbPromise     = require('bluebird');

const schemaFactory = require('../../src/query/schema');
const DayService    = require('../../src/services/day');
const GraphQLService    = require('../../src/services/graphql');

const mockData = [{
  "date": '2016-08-01T22:16:43.642Z',
  "moisture": 1.1
},{
  "date": '2016-08-01T22:16:43.641Z',
  "moisture": 0.4
}];

describe('#handler()', () => {
  let graphQlService;

  beforeEach(() => {
    const dayService = {
      getLastHours() {
          return mockData;
      }
    };

    graphQlService = GraphQLService({ dayService: dayService });
  });

  it('return data', function() {
    const query = `{
      day {
        date, moisture
      }
    }`;

    return graphQlService.runQuery(query)
      .then((result) => {
        expect(result).to.deep.equal({
          data: {
            day: mockData
          }
        });
      });
  });
});
