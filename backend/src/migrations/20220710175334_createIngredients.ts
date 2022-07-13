import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("ingredients", (table) => {
    table.bigIncrements("id").primary();
    table.bigInteger("userId").notNullable();
    table.dateTime("knowledgeBeginDate").notNullable();
    table.dateTime("knowledgeEndDate");
    table.string("name", 255).notNullable();
    table.float("quantity").notNullable();
    table.string("unit", 255).notNullable();
    table.float("proteins").notNullable();
    table.float("carbs").notNullable();
    table.float("fats").notNullable();
    table.float("fibers").notNullable();
    table.float("energy").notNullable();
    table.string("category", 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("ingredients");
}
