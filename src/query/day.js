
'use strict';

const graphql = require('graphql');

const MoistureType = new graphql.GraphQLObjectType({
  name: 'Moisture',
  fields: {
    date: { type: graphql.GraphQLString },
    moisture: { type: graphql.GraphQLFloat },
  }
});

module.exports = function(dayService) {
  return {
    name: 'DayQuery',
    description: 'Retrieve moisture levels per day',
    type: new graphql.GraphQLList(MoistureType),
    args: {
      day: { type: graphql.GraphQLInt },
      month: { type: graphql.GraphQLInt },
      year: { type: graphql.GraphQLInt },
    },
    resolve: (_, args, ast) => {
      return dayService.getLastHours('garden-aid-client-test-js', 24);
    }
  }
}
