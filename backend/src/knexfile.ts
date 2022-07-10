import type { Knex } from "knex";
import path from "path";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
    },
    pool: {
      min: 2,
      max: 10,
    },
    useNullAsDefault: true,
    seeds: {
      directory: path.join(__dirname, "./seeds"),
    },
    migrations: {
      directory: path.join(__dirname, "./migrations"),
      tableName: "migrations",
    },
  },
};

export default config;
