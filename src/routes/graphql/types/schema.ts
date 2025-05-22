import { GraphQLSchema } from "graphql";
import { AppMutation } from "../queries/mutation.js";
import { AppQuery } from "../queries/query.js";

export const schema = new GraphQLSchema({
  mutation: AppMutation,
  query: AppQuery,
})
