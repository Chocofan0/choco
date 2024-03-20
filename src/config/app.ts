import e from "express";
import { createYoga } from "graphql-yoga";
import { createContext } from "../schema/context";
import knex, { Knex } from "knex";
import { dbConfig } from "./database";
import { schema } from "../schema";
import { authPlugin } from "../schema/plugins/auth-plugins";
import { inject, injectable } from "tsyringe";

@injectable()
export class App {
  public db: Knex;
  public express: e.Express;

  constructor(@inject("knex") knex: Knex) {
    this.db = knex;
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
