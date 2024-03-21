import "reflect-metadata";
import "../../src/config/container";
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
import { createWalletTestHelper } from "../__helpers__/wallet-test-helper";
import { container } from "tsyringe";

describe("Wallet test integration", () => {
  let yoga: YogaServerInstance<{}, ContextType>;
  let db: Knex;
  let executor: AsyncExecutor<any, HTTPExecutorOptions>;

  let uid: string;
  let token: string;
  let id: string;

  beforeAll(async () => {
    const app = container.resolve(App);
    yoga = app.createYogaApp();
    db = app.db;

    executor = buildHTTPExecutor({
      fetch: yoga.fetch,
    });

    uid = await createUserTestHelper(db);
    id = await createWalletTestHelper(db, uid);
    token = authenticatedUser(uid);
  });

  it("Get wallet", async () => {
    const result = await executor({
      document: parse(/* GraphQL */ `
        query Wallet($id: String!) {
          wallet(id: $id) {
            node {
              id
            }
          }
        }
      `),
      extensions: {
        headers: {
          Authorization: token,
        },
      },
      variables: { id },
    });


    expect(result).not.toHaveProperty("errors");
  });

  it("Get All wallet", async () => {
    const result = await executor({
      document: parse(/* GraphQL */ `
        query {
          allWallet {
            edges {
              node {
                id
              }
            }
          }
        }
      `),
      extensions: {
        headers: {
          Authorization: token,
        },
      },
    });

    expect(result).not.toHaveProperty("errors");
  });

  afterAll(async () => {
    await db.table("users").where("id", uid).del();
    await db.table("wallet").where("id", id).del();
    await db.destroy();
  });
});
