import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { CurrentUser as currentUser } from "./resolvers/user/queries/current-user";
import { walletQuery } from "./resolvers/wallet/queries/walllet";
import { allWallet } from "./resolvers/wallet/queries/all-wallet";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      user: currentUser,
      wallet: walletQuery,
      allWallet: allWallet,
    },
  }),
});
