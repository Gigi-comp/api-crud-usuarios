import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm"; //é uma classe do typeorm usada para conectar/ configurar com o banco, etc.
import {User} from "../models/User.js";

export const AppDataSource = new DataSource({ //estamos criando uma conexão do banco usando o typeORM
    type: "sqlite",
    database: process.env.DB_DATABASE || "database.sqlite",  //estamos colocando o database.sqlite de novo pra caso o .env não carregue
    synchronize: false,
    entities: [User],
    migrations: ["src/migrations/*.ts"],
})