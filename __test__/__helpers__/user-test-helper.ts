import { Knex } from "knex";
import { UserRepository } from "../../src/app/repositories/user-repository";
import jwt from "jsonwebtoken";

export async function createUserTestHelper(db: Knex) {
  return new UserRepository(db).insert({
    name: "demo",
    email: "demo@demo.id",
  });
}

export function authenticatedUser(id: string) {
  return jwt.sign({ id: id }, process.env.JWT_KEY as string);
}
