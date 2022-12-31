//all the libs are here on the top
const express = require('express');
//importing gql exp node js exp-gql 
/
const { graphqlHTTP } = require('express-graphql');
const _ = require('lodash');
var { graphql, buildSchema } = require('graphql');

const app = express();

// Example users array
const users = [
  {
    id: 1,
    name: 'Alice',
    age: 25
  },
  {
    id: 2,
    name: 'Bob',
    age: 30
  },
  {
    id: 3,
    name: 'Charlie',
    age: 35
  }
];

// Define the GraphQL schema
const schema = buildSchema(`
  type Query {
    users: [User]
    user(id: Int!): User
  }

  type User {
    id: Int
    name: String
    age: Int
  }
`);

// Define the root value for the GraphQL API
const rootValue = {
  users: () => users,
  user: ({ id }) => _.find(users, ['id', id])
};

// Set up the GraphQL API route
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('GraphQL API running at localhost:4000/graphql');
});
