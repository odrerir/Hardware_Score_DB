import "reflect-metadata"
import { AppDataSource } from "../data-source";
import  express from "express";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized!");

    app.listen(3000, () => {
      console.log("Servidor rodando em http://localhost:3000");
    });
  })
  .catch((err: unknown) => {
    console.error("Erro ao inicializar o Data Source:", err);
  });