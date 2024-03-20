/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable("users").then((has) => {
    if (!has) {
      return knex.schema.createTable("users", ($) => {1
        $.string("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
        $.string("name");
        $.string("email").index();
        $.string("google_id").index();
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
  return knex.schema.dropTableIfExists("users");
};
