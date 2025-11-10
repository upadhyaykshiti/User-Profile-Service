
import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config(); 

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "root",
      database: process.env.DB_NAME || "user_profiles",
    },
    migrations: {
      extension: "ts",
      directory: "./migrations",
    },
  },
};

export default config;
