import {
  GraphQLEnumType,
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from "graphql";
import { ContextType } from "../../../context";
import {
  orderWalletType,
  sortWalletType,
  walletType,
} from "../../../../app/entity/wallet";

export const allWallet: GraphQLFieldConfig<unknown, ContextType> = {
  type: new GraphQLList(
    new GraphQLObjectType({
      name: "AllWalletResponse",
      fields: {
        ...walletType.fields,
      },
    })
  ),

  extensions: {
    reqAuth: true,
  },

  args: {
    order: {
      type: new GraphQLEnumType(orderWalletType),
      defaultValue: "created_at",
    },
    sort: {
      type: new GraphQLEnumType(sortWalletType),
      defaultValue: "ASC",
    },
    limit: {
      type: GraphQLInt,
      defaultValue: 3,
    },
  },

  resolve: async (_, args, context) => {
    const result = await context.repository.walletRepo.findMany({
      ...args,
      userId: context.id,
    });

    return result;
  },
};
