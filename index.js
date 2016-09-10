
const env = require('./env');

const config = require('./config.json');
const secrets = require('./secrets.json');

env(config);
env(secrets, true);

// Setup env vars before requiring functions
const graphql = require('./src/graphql');
const authorize = require('./src/authorize');

const iopipe = require('iopipe')({
   clientId: process.env.IOPIPE_KEY
});

module.exports.graphql = iopipe(graphql.handler);
module.exports.authorize = iopipe(authorize.handler);
