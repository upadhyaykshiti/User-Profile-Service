import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {

  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + "/entities/*.{ts,js}"],
  synchronize: true, 
  logging: false,
};

export default config;
