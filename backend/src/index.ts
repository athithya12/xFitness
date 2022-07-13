import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./graphql";

// Type overrides
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_PORT: string;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { userId: 1 };
  },
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀  GraphQL server ready at ${url}`);
});
