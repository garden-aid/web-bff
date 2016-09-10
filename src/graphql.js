
const tablesFactory = require('./dynamodb/tables');
const moistureService = require('./services/moisture');
const graphQLService = require('./services/graphql');

const tables = tablesFactory();
const moistureService = moistureService({ moistureTable: tables.Moisture });
const graphql = graphQLService({ moistureService: moistureService });

module.exports.handler = (event, context, cb) => {
  console.log('Received event', event);

  return graphql.runQuery(event.body.query)
    .then((response) => cb(null, response))
    .catch((error) => cb(error));
};
