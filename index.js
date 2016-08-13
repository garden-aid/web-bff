
const config = require('./config.json')

require('./env')(config);

// Setup env vars before requiring functions
const graphql = require('./src/graphql');

module.exports.graphql = graphql.handler;
