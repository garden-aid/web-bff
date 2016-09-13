
const stampit = require('stampit');
const graphql = require('graphql');

const schemaFactory = require('../query/schema');

const Logger = require('../logger');

const GraphQLService = stampit()
  .init((opts) => {
    if (!opts.instance.moistureService) throw new Error('moistureService is required');

    const schema = schemaFactory(opts.instance.moistureService);
    opts.instance.schema = schema; // eslint-disable-line no-param-reassign
  })
  .methods({
    runQuery(query) {
      return graphql.graphql(this.schema, query);
    },
  })
  .compose(Logger);

module.exports = GraphQLService;
