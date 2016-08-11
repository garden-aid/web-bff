'use strict';

const graphql = require('graphql');

const dayFactory = require('./day');

module.exports = function(dayService) {
  const schema = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
      name: 'Root',
      description: 'Root of the Schema',
      fields: {
        day: dayFactory(dayService)
      }
    })
  });

  return schema;
}
