import e from "express";
import { createYoga } from "graphql-yoga";
import { createContext } from "../schema/context";
import knex, { Knex } from "knex";
import { dbConfig } from "./database";
import { schema } from "../schema";
import { authPlugin } from "../schema/plugins/auth-plugins";

export class App {
  public db: Knex;
  public express: e.Express;

  constructor() {
    this.db = knex(dbConfig);
    this.express = e();
    this.middleware();
  }

  private middleware() {
    this.express.use(
      this.createYogaApp().graphqlEndpoint,
      this.createYogaApp()
    );
  }

  public createYogaApp() {
    return createYoga({
      schema: schema,
      context: ({ request }) => createContext(request, this.db),
      plugins: [authPlugin()],
    });
  }
}
