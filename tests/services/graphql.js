'use strict';

const expect = require('chai').expect;

const graphQLService = require('../../src/services/graphql');

const mockData = [{
  date: '2016-08-01T22:16:43.642Z',
  moisture: 1.1,
}, {
  date: '2016-08-01T22:16:43.641Z',
  moisture: 0.4,
}];

describe('#handler()', () => {
  let graphql;

  beforeEach(() => {
    const moistureService = {
      getLastHours() {
        return mockData;
      },
    };

    graphql = graphQLService({ moistureService });
  });

  it('return data', () => {
    const query = `{
      moisture {
        date, moisture
      }
    }`;

    return graphql.runQuery(query)
      .then((result) => {
        expect(result).to.deep.equal({
          data: {
            moisture: mockData,
          },
        });
      });
  });
});
