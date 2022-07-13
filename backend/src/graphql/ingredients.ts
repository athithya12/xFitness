import { gql } from "apollo-server";

const typeDefs = gql`
  type Ingredient {
    id: Int!
    userId: Int!
    knowledgeBeginDate: Date!
    knowledgeEndDate: Date
    name: String!
    quantity: Int!
    unit: String!
    proteins: Float!
    carbs: Float!
    fats: Float!
    fibers: Float!
    energy: Float!
    category: String!
  }
`;

const resolvers = {};

export { typeDefs as IngredientsQuery, resolvers as ingredientsResolvers };
