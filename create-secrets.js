#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');


const iopipeKey = process.env.IOPIPE_KEY;

if (!iopipeKey) {
  throw new Error('Please set IOPIPE_KEY env var');
}

const secrets = {
  iopipe: {
    key: iopipeKey
  }
};

const secretsPath = path.resolve(__dirname, './secrets.json');
fs.writeFileSync(secretsPath, JSON.stringify(secrets));
