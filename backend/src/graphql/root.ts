import { gql } from "apollo-server";
import { IngredientsAccessor } from "../accessors";

export const typeDefs = gql`
  type Query {
    ingredients: [Ingredient]!
  }

  type Mutation {
    ping: String
  }
`;

export const resolvers = {
  Query: {
    ingredients: async (_: any, __: any, context: { userId: number }) => {
      const ingredients = await new IngredientsAccessor(
        context.userId
      ).clientKdAware();

      return ingredients;
    },
  },
  Mutation: {
    ping: () => "pong",
  },
};

export { typeDefs as RootQuery, resolvers as rootResolvers };
