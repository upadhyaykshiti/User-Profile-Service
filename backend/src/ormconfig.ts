import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {

  type: "mysql",
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_PORT),
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  // entities: [__dirname + "/entities/*.{ts,js}"],
  // synchronize: true, 
  // logging: false,
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "zio",
  password: process.env.DB_PASS || "12345",
  database: process.env.DB_NAME || "user_profiles",
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
};

export default config;
