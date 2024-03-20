import {
  GraphQLError,
  TypeInfo,
  ValidationContext,
  getNamedType,
  isObjectType,
  visit,
  visitWithTypeInfo,
} from "graphql";
import { Plugin } from "graphql-yoga";
import jwt from "jsonwebtoken";
import { User } from "../../app/entity/user";
import { ContextType } from "../context";

export const authPlugin = (): Plugin => {
  let schema: TypeInfo;

  function getTypeInfo(): TypeInfo | undefined {
    return schema;
  }

  return {
    onSchemaChange: ({ schema }) => {
      schema = new TypeInfo(schema);
    },

    onExecute: ({ executeFn, extendContext, args }) => {
      const typeInfo = getTypeInfo() ?? new TypeInfo(args.schema);

      const context = new ValidationContext(
        args.schema,
        args.document,
        typeInfo,
        (e) => {
          throw e;
        }
      );

      visit(
        args.document,
        visitWithTypeInfo(typeInfo, {
          Field: (node) => {
            const fieldType = getNamedType(context.getParentType()!);

            if (isObjectType(fieldType)) {
              const field = fieldType.getFields()[node.name.value];

              if (!field) {
                return null;
              }

              if (field.extensions.reqAuth) {
                try {
                  const result = jwt.verify(
                    args.contextValue.request.headers.get(
                      "authorization"
                    ) as string,
                    process.env.JWT_KEY as string
                  ) as jwt.JwtPayload & User;



                  extendContext({ id: result.id, } as any);

                  executeFn(args);
                } catch (error) {
                  if (error instanceof jwt.TokenExpiredError) {
                    throw new GraphQLError(
                      "authentication session has expired"
                    );
                  }
                  throw new GraphQLError("error authentication");
                }
              }
            }

            return undefined;
          },
        })
      );
    },
  };
};
