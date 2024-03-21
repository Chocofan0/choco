import {
  GraphQLError,
  GraphQLFieldConfig,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { ContextType } from "../../../context";
import { walletType } from "../../../../app/entity/wallet";

export const walletQuery: GraphQLFieldConfig<undefined, ContextType> = {
  type: new GraphQLObjectType(walletType),

  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },

  extensions: {
    reqAuth: true,
  },

  resolve: async (_, { id }, context) => {
    const wallet = await context.repository.walletRepo.findOneById(id);

    if (!wallet) {
      throw new GraphQLError(`wallet ${id} not found`);
    }

    if (context.id !== wallet.user_id) {
      throw new GraphQLError("not allowed operation");
    }

    return {
      node: wallet,
    };
  },
};
