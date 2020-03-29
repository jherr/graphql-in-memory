const { graphql, buildSchema } = require('graphql');
const { addResolveFunctionsToSchema } = require('graphql-tools');

const SCHEMA = `
type Query {
  tasks: [String!]
}

type Mutation {
  addTask(name: String!): String!
}`;

const schema = buildSchema(SCHEMA);

const resolvers = {
  Query: {
    tasks: (root) => root.tasks,
  },
  Mutation: {
    addTask: (root, { name }) => {
      root.tasks.push(name);
    }
  }
};

const root = {
  tasks: [
    'Wash dishes',
    'Do laundry',
    'Donate blood',
  ],
};

addResolveFunctionsToSchema({
  schema,
  resolvers,
});

export default (gql, variables = {}) => graphql(schema, gql, root, {}, variables);
