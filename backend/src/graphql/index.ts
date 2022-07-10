import { merge } from "lodash";
import { RootQuery, rootResolvers } from "./root";

const typeDefs = [RootQuery];

const resolvers = merge(rootResolvers);

export { typeDefs, resolvers };
