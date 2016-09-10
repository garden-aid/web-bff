#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const envVars = [
  'IOPIPE_KEY',
  'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET',
];

const secrets = _.pick(process.env, envVars);
const secretKeys = Object.keys(secrets);

console.log('Writing env vars ', secretKeys);

if (!_.isEqual(envVars, secretKeys)) {
  throw new Error('Missing some env vars');
}

_.forEach(secrets, (secret, key) => {
  if (!secret) {
    throw new Error(`${key} is required`);
  }
});

const secretsPath = path.resolve(__dirname, './secrets.json');

fs.writeFileSync(secretsPath, JSON.stringify(secrets));
