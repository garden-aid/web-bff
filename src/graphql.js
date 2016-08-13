'use strict';

const graphql = require('graphql');

const schemaFactory = require('./query/schema');
const tablesFactory = require('./dynamodb/tables');
const DayService    = require('./services/day');

const getSchema = function() {
  const tables = tablesFactory();
  const dayService = DayService({ dayTable: tables.Day });
  return schemaFactory(dayService);
};

const handler = function(event, context, cb) {
  console.log('Received event', event);

  const schema = this.getSchema();

  console.log('Processing graphql query');
  return graphql.graphql(schema, event.body.query)
    .then((response) => {
      cb(null, response)
    })
    .catch((error) => {
      cb(error)
    });
};

const graphqlLambda = {
  getSchema: getSchema,
};

graphqlLambda.handler = handler.bind(graphqlLambda),

module.exports = graphqlLambda;
