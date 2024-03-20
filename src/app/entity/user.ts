import { GraphQLObjectTypeConfig, GraphQLString } from "graphql";

export type User = {
  id: string;
  name: string;
  email: string;
};

export const userType: GraphQLObjectTypeConfig<any, any> = {
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
};
