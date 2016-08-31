'use strict';

const tablesFactory = require('./dynamodb/tables');
const MoistureService    = require('./services/moisture');
const GraphQLService = require('./services/graphql');

const tables = tablesFactory();
const moistureService = MoistureService({ moistureTable: tables.Moisture });
const graphQLService = GraphQLService({ moistureService: moistureService });

module.exports.handler = function(event, context, cb) {
  console.log('Received event', event);

  const query = event.body.query;

  return graphQLService.runQuery(event.body.query)
    .then((response) => {
      cb(null, response)
    })
    .catch((error) => {
      cb(error)
    });
};
