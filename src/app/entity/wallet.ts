import { GraphQLInt, GraphQLObjectTypeConfig, GraphQLString } from "graphql";

export type Wallet = {
  id: string;
  name: string;
  balance: number;
  user_id: string;
};

export const walletType: GraphQLObjectTypeConfig<any, any> = {
  name: "Wallet",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    balance: { type: GraphQLInt },
  },
};
