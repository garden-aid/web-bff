
'use strict';

const expect        = require('chai').expect;
const sinon         = require('sinon');
const BbPromise     = require('bluebird');

const schemaFactory = require('../../src/query/schema');
const MoistureService    = require('../../src/services/moisture');
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
    const moistureService = {
      getLastHours() {
          return mockData;
      }
    };

    graphQlService = GraphQLService({ moistureService: moistureService });
  });

  it('return data', function() {
    const query = `{
      moisture {
        date, moisture
      }
    }`;

    return graphQlService.runQuery(query)
      .then((result) => {
        expect(result).to.deep.equal({
          data: {
            moisture: mockData
          }
        });
      });
  });
});
