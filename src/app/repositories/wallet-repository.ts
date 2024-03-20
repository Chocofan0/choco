import { Knex } from "knex";
import { Wallet } from "../entity/wallet";
import { inject, injectable } from "tsyringe";

type FindArguments = {
  userId: string;
  order: Pick<Wallet, "created_at">;
  sort: "ASC" | "DESC";
  limit: number;
};

@injectable()
export class WalletRepository {
  private wallet: Knex.QueryBuilder<Wallet, Wallet[]>;

  constructor(@inject("knex") knex: Knex) {
    this.wallet = knex("wallet");
  }

  public async findOneById(id: string) {
    const wallet = await this.wallet.where({ id });

    if (!wallet) {
      return null;
    }

    return wallet[0];
  }

  public async insert(data: Partial<Wallet>, t?: Knex.Transaction) {
    try {
      this.wallet.insert({ ...data } as unknown as Wallet);

      if (t) {
        this.wallet.transacting(t);
      }

      const result = await this.wallet.returning("id");

      return result[0].id;
    } catch (error) {
      throw new Error("internal server error");
    }
  }

  public async findMany(args: FindArguments) {
    if (args.userId) {
      this.wallet.where("user_id", args.userId);
    }

    if (args.order) {
      if (args.sort) {
        this.wallet.orderBy(args.order as any, args.sort);
      } else {
        this.wallet.orderBy(args.order as any, "desc");
      }
    }

    return this.wallet.limit(args.limit ?? 5);
  }
}
