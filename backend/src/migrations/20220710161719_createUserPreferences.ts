import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("userPreferences", (table) => {
    table.bigIncrements("id").primary();
    table.bigInteger("userId").notNullable();
    table.dateTime("knowledgeBeginDate").notNullable();
    table.dateTime("knowledgeEndDate");
    table.float("proteins").notNullable();
    table.float("carbs").notNullable();
    table.float("fats").notNullable();
    table.float("fibers").notNullable();
    table.float("energy").notNullable();
    table.float("waterGlasses").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("userPreferences");
}
