import { GraphQLObjectTypeConfig, GraphQLString } from "graphql";

export type User = {
  id: string;
  name: string;
  email: string;
  google_id: string;
  created_at: Date;
  updated_at: Date;
};

export const userType: GraphQLObjectTypeConfig<any, any> = {
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
};
