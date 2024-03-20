import knex from "knex";
import { container } from "tsyringe";
import { dbConfig } from "./database";

container.registerInstance("knex", knex(dbConfig));
