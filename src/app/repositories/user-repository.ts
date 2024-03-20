import { Knex } from "knex";
import { User } from "../entity/user";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserRepository {
  private user: Knex.QueryBuilder<User, User[]>;

  constructor(@inject("knex") knex: Knex) {
    this.user = knex.table("users");
  }

  public async findOneById(id: string) {
    const user = await this.user.where("id", "=", id);

    if (!user) {
      return null;
    }

    return user[0];
  }

  public async insert(data: Partial<User>, t?: Knex.Transaction) {
    try {
      this.user.insert({ ...data } as unknown as User);

      if (t) {
        this.user.transacting(t);
      }

      const result = await this.user.returning("id");

      return result[0].id;
    } catch (error) {
      throw new Error("internal server error");
    }
  }
}
