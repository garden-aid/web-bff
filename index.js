
const env = require('./env');

const config = require('./config.json');
const secrets = require('./secrets.json');

env(config);
env(secrets, true);

// Setup env vars before requiring functions
const graphql = require('./src/graphql');
const iopipe = require("iopipe")({
   clientId: process.env.iopipe.key
});

module.exports.graphql = graphql.handler;
