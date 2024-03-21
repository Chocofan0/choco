import {
  GraphQLEnumTypeConfig,
  GraphQLInt,
  GraphQLObjectType,
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

const Node = new GraphQLObjectType({
  name: "NodeWallet",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

export const walletType: GraphQLObjectTypeConfig<any, any> = {
  name: "WalletResponse",
  fields: {
    node: {
      type: Node,
    },
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
