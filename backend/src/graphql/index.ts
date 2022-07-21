import { merge } from "lodash";
import { CommonQuery, commonResolvers } from "./common";
import { IngredientsQuery, ingredientsResolvers } from "./ingredients";
import { RootQuery, rootResolvers } from "./root";

const typeDefs = [CommonQuery, IngredientsQuery, RootQuery];

const resolvers = merge(
  commonResolvers,
  ingredientsResolvers,
  rootResolvers
);

export { typeDefs, resolvers };
