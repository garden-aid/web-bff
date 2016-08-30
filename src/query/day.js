
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
      clientId: {
        type: graphql.GraphQLString,
      },
      hours: {
        type: graphql.GraphQLInt,
        defaultValue: 1
      },
    },
    resolve: (_, args, ast) => {
      const hours = args.hours > 0 ? args.hours : 1;
      return dayService.getLastHours(args.clientId, hours);
    }
  }
}
