import { Knex } from "knex";
import { User } from "../entity/user";

export class UserRepository {
  private user: Knex.QueryBuilder<User, User[]>;

  constructor(knex: Knex) {
    this.user = knex.table("users");
  }

  public async findOneById(id: string) {
    const user = await this.user.where("id", "=", id);

    if (!user) {
      return null;
    }

    return user[0];
  }

  public async insert(data: Partial<User>) {
    try {
      const result = await this.user
        .insert({ ...data } as unknown as User)
        .returning("id");

      return result[0].id;
    } catch (error) {
      throw new Error("internal server error");
    }
  }
}
