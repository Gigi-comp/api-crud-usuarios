import "reflect-metadata";
import dotenv from "dotenv";
import cors from "cors"
import userRoutes from "./routes/userRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import express from "express"
import { AppDataSource } from "./database/db.js";


dotenv.config();
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())

app.use(express.json())
app.use(userRoutes);
app.use(errorHandler);

AppDataSource.initialize()
.then(()=> {
    console.log("Banco conectado");
    app.listen(Number(PORT), () => {
    console.log('Iniciou o servidor na porta:' +
        PORT
    )
})

})
.catch((error:any) =>{
    console.log("Erro ao conectar com o banco");
    console.error(error);
})

