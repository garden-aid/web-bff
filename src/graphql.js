'use strict';

const tablesFactory = require('./dynamodb/tables');
const DayService    = require('./services/day');
const GraphQLService = require('./services/graphql');

const tables = tablesFactory();
const dayService = DayService({ dayTable: tables.Day });
const graphQLService = GraphQLService({ dayService: dayService });

module.exports.handler = function(event, context, cb) {
  console.log('Received event', event);

  const query = event.body.query;

  return graphQLService.query(event.body.query)
    .then((response) => {
      cb(null, response)
    })
    .catch((error) => {
      cb(error)
    });
};
