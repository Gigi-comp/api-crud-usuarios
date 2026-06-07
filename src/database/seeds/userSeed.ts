import "reflect-metadata";
import { User } from "../../models/User.js";
import { AppDataSource } from "../db.js";

async function seed() {

    await AppDataSource.initialize();
    console.log("Banco conectado. Iniciando o seed");

    const repository = AppDataSource.getRepository(User);
    const usuariosIniciais =[
        {
        nome: "Anna Souza",
        email: "ana@hotmail.com",
        senha: "shaolin123",
        idade: 18,
        },
        {
        nome: "Jãozin",
        email: "joaoPedro@gmail.com",
        senha: "12345678",
        idade: 22,
        },
        {
        nome: "Gisele",
        email: "gisele123@hotmail.com",
        senha: "giselebintchin",
        idade: 18,
        },
    ];
    for(const dados of usuariosIniciais){
        const jaExiste = await repository.findOne({
            where:{email:dados.email},
        });
        if(jaExiste){
            console.log(`Usuário ${dados.email} já existe.`);
            continue;
        }
        const usuario = repository.create(dados);
        await repository.save(usuario);
        console.log(`Usuário ${dados.nome} foi criado com sucesso!`);
    }
    console.log("Seed finalizado");
    await AppDataSource.destroy();
    
}
seed(). catch((error) => {
    console.error ("Erro ao executar seed: ", error);
    process.exit(1);
});