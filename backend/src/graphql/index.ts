import { merge } from "lodash";
import { CommonQuery, commonResolvers } from "./common";
import { IngredientsQuery, ingredientsResolvers } from "./ingredients";
import { RootQuery, rootResolvers } from "./root";

const typeDefs = [RootQuery, CommonQuery, IngredientsQuery];

const resolvers = merge(
  rootResolvers,
  commonResolvers,
  ingredientsResolvers
);

export { typeDefs, resolvers };
