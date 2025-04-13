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
  synchronize: false,         // Não sincroniza as entidades automaticamente
  logging: true,              // Habilita o log das queries SQL
  entities: [
    "src/entities/**/*.ts",
  ],
  migrations: [
    "src/database/migrations/**/*.ts"
  ]
});
