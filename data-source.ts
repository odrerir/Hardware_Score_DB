import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Caua2003",
  database: "postgres",
  schema: "public",
  entities: ["./src/entities/**/*.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
});
