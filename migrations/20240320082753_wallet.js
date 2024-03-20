/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable("wallet").then((has) => {
    if (!has) {
      return knex.schema.createTable("wallet", ($) => {1
        $.string("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
        $.string("name");
        $.integer("balance")
        $.string("user_id").index();
        $.timestamp("created_at").defaultTo(knex.raw("NOW()"));
        $.timestamp("updated_at");
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("wallet");
};
