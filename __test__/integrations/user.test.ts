import { YogaServerInstance } from "graphql-yoga";
import { App } from "../../src/config/app";
import { ContextType } from "../../src/schema/context";
import { Knex } from "knex";
import {
  HTTPExecutorOptions,
  buildHTTPExecutor,
} from "@graphql-tools/executor-http";
import { AsyncExecutor } from "@graphql-tools/utils";
import { parse } from "graphql";
import {
  authenticatedUser,
  createUserTestHelper,
} from "../__helpers__/user-test-helper";
import { User } from "../../src/app/entity/user";

describe("User test integration", () => {
  let yoga: YogaServerInstance<{}, ContextType>;
  let db: Knex;
  let executor: AsyncExecutor<any, HTTPExecutorOptions>;

  let id: string;
  let token: string;

  beforeAll(async () => {
    const app = new App();
    yoga = app.createYogaApp();
    db = app.db;

    executor = buildHTTPExecutor({
      fetch: yoga.fetch,
    });

    id = await createUserTestHelper(db);
    token = authenticatedUser(id);
  });

  it("Get current user", async () => {
    const result = await executor({
      document: parse(/* GraphQL */ `
        {
          user {
            id
          }
        }
      `),
      extensions: {
        headers: {
          Authorization: token,
        },
      },
    });

    expect((result as { data: { user: User } }).data.user.id).toEqual(id);
    expect(result).not.toHaveProperty("errors");
  });

  afterAll(async () => {
    await db.table("users").where("id", id).del();
    await db.destroy();
  });
});
