import { gql } from "apollo-server";
import { IngredientsAccessor } from "../accessors";
import { IngredientsModel } from "../models";
import { BaseModelFields } from "../models/baseModel";

export const typeDefs = gql`
  type Query {
    ingredients: [Ingredient]!
    ingredient(ingredientId: Int!): Ingredient!
  }

  type Mutation {
    addIngredient(ingredient: IngredientInput!): String!
    updateIngredient(
      ingredientId: Int!
      ingredient: IngredientUpdateInput!
    ): String!
    deleteIngredient(ingredientId: Int!): String!
  }
`;

export const resolvers = {
  Query: {
    ingredients: async (_: any, __: any, context: { userId: number }) => {
      const ingredients = await new IngredientsAccessor(
        context.userId
      ).getAllRecords();

      return ingredients;
    },
    ingredient: async (
      _: any,
      { ingredientId }: { ingredientId: number },
      context: { userId: number }
    ) => {
      const ingredient = await new IngredientsAccessor(
        context.userId
      ).getRecordById(ingredientId);

      return ingredient;
    },
  },
  Mutation: {
    addIngredient: async (
      _: any,
      {
        ingredient,
      }: { ingredient: Omit<IngredientsModel, BaseModelFields> },
      context: { userId: number }
    ) => {
      await new IngredientsAccessor(context.userId).create(ingredient);
      return "Ingredient added successfully!";
    },
    updateIngredient: async (
      _: any,
      {
        ingredientId,
        ingredient,
      }: {
        ingredientId: number;
        ingredient: Omit<IngredientsModel, BaseModelFields>;
      },
      context: { userId: number }
    ) => {
      await new IngredientsAccessor(context.userId).update(
        ingredientId,
        ingredient
      );
      return "Ingredient updated successfully!";
    },
    deleteIngredient: async (
      _: any,
      {
        ingredientId,
      }: {
        ingredientId: number;
      },
      context: { userId: number }
    ) => {
      await new IngredientsAccessor(context.userId).deleteRecord(
        ingredientId
      );
      return "Ingredient deleted successfully!";
    },
  },
};

export { typeDefs as RootQuery, resolvers as rootResolvers };
