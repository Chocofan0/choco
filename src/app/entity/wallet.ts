import {
  GraphQLEnumTypeConfig,
  GraphQLInt,
  GraphQLObjectTypeConfig,
  GraphQLString,
} from "graphql";

export type Wallet = {
  id: string;
  name: string;
  balance: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
};

export const walletType: GraphQLObjectTypeConfig<any, any> = {
  name: "Wallet",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    balance: { type: GraphQLInt },
  },
};

export const orderWalletType: GraphQLEnumTypeConfig = {
  name: "WALLET_ORDER_ENUM",
  values: {
    CREATED_AT: {
      value: "created_at",
    },
  },
};

export const sortWalletType: GraphQLEnumTypeConfig = {
  name: "WALLET_SORT_ENUM",
  values: {
    ASC: {
      value: "asc",
    },
    DESC: {
      value: "desc",
    },
  },
};
