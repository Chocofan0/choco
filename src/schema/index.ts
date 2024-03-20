import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { CurrentUser as currentUser } from "./resolvers/user/current-user";
import { walletQuery } from "./resolvers/wallet/walllet";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      user: currentUser,
      wallet: walletQuery,
    },
  }),
});
