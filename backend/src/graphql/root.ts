import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    ping: String
  }

  type Mutation {
    ping: String
  }
`;

export const resolvers = {
  Query: {
    ping: () => "pong",
  },
  Mutation: {
    ping: () => "pong",
  },
};

export { typeDefs as RootQuery, resolvers as rootResolvers };
