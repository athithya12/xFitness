import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.bigIncrements("id").primary();
    table.dateTime("knowledgeBeginDate").notNullable();
    table.dateTime("knowledgeEndDate");
    table.string("firstName", 255).notNullable();
    table.string("lastName", 255);
    table.string("email", 127).unique().notNullable();
    table.date("dob").notNullable();
    table.string("gender", 63).notNullable();
    table.float("height").notNullable();
    table.float("weight").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
