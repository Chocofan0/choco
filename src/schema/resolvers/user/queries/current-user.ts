import { GraphQLError, GraphQLFieldConfig, GraphQLObjectType } from "graphql";
import { ContextType } from "../../../context";
import { userType } from "../../../../app/entity/user";

export const CurrentUser: GraphQLFieldConfig<unknown, ContextType> = {
  type: new GraphQLObjectType({
    name: "CurrentUserResponse",
    fields: userType.fields,
  }),

  extensions: {
    reqAuth: true,
  },

  resolve: async (_, _args, context) => {
    const user = await context.repository.userRepo.findOneById(
      context.id as string
    );

    if (!user) {
      throw new GraphQLError("user not found");
    }

    return user;
  },
};
