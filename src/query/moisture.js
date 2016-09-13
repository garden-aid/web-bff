
const graphql = require('graphql');

const MoistureType = new graphql.GraphQLObjectType({
  name: 'Moisture',
  fields: {
    date: { type: graphql.GraphQLString },
    moisture: { type: graphql.GraphQLFloat },
  },
});

module.exports = (moistureService) => ({
  name: 'MoistureQuery',
  description: 'Retrieve moisture level',
  type: new graphql.GraphQLList(MoistureType),
  args: {
    clientId: {
      type: graphql.GraphQLString,
    },
    hours: {
      type: graphql.GraphQLInt,
      defaultValue: 1,
    },
  },
  resolve(_, args, ast) { // eslint-disable-line no-unused-vars
    const hours = args.hours > 0 ? args.hours : 1;
    return moistureService.getLastHours(args.clientId, hours);
  },
});
