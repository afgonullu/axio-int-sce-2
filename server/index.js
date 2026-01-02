import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    roles: [String!]!
  }

  type CrmAccount {
    id: ID!
    name: String!
    owner: String!
    health: String!
  }

  type Query {
    viewer: User!
    crmAccounts: [CrmAccount!]!
  }
`;

const viewer = {
  id: 'user-17',
  name: 'Tess Student',
  roles: ['student'],
};

const crmAccounts = [
  {
    id: 'acc-1',
    name: 'North Ridge University',
    owner: 'A. Patel',
    health: 'Good',
  },
  {
    id: 'acc-2',
    name: 'Southfield Institute',
    owner: 'M. Rivera',
    health: 'Watch',
  },
  {
    id: 'acc-3',
    name: 'Evergreen College',
    owner: 'J. Chen',
    health: 'Risk',
  },
];

const resolvers = {
  Query: {
    viewer: () => viewer,
    crmAccounts: () => crmAccounts,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
});

console.log(`GraphQL server ready at ${url}`);
