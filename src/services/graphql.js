
'use strict';

const BbPromise = require('bluebird');
const stampit = require('stampit');
const moment = require('moment');
const graphql = require('graphql');

const schemaFactory = require('../query/schema');

const Logger = require('../logger');

const GraphQLService = stampit().
  init((opts) => {
    if(!opts.instance.dayService) throw new Error('dayService is required');

    opts.instance.schema = schemaFactory(opts.instance.dayService);
  }).
  methods({
    runQuery(query) {
      return graphql.graphql(this.schema, query);
    },
  }).
  compose(Logger);

module.exports = GraphQLService;
