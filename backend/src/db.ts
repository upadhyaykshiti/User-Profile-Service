import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./ormconfig";
import { User } from "./entities/User";
import { AuditLog } from "./entities/AuditLog";

const AppDataSource = new DataSource({ ...config, entities: [User, AuditLog] });

export default AppDataSource;
