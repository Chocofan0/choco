import { Knex } from "knex";
import { Wallet } from "../entity/wallet";

export class WalletRepository {
  private wallet: Knex.QueryBuilder<Wallet, Wallet[]>;

  constructor(knex: Knex) {
    this.wallet = knex("wallet");
  }

  public async findOneById(id: string) {
    const wallet = await this.wallet.where({ id });

    if (!wallet) {
      return null;
    }

    return wallet[0];
  }

  public async insert(data: Partial<Wallet>) {
    try {
      const result = await this.wallet
        .insert({ ...data } as unknown as Wallet)
        .returning("id");

      return result[0].id;
    } catch (error) {
      throw new Error("internal server error");
    }
  }
}
