import { Knex } from "knex";
import jwt from "jsonwebtoken";
import { WalletRepository } from "../../src/app/repositories/wallet-repository";

export async function createWalletTestHelper(db: Knex, user: string) {
  return new WalletRepository(db).insert({
    name: "Main",
    balance: 0,
    user_id: user,
  });
}
