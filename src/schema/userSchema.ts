import {z} from "zod";  //z é a ferramenta principal do Zod pra criar schemas e validar dados. O zod coloca quase tudo dentro de um objeto
export const createUserSchema = z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email:z.string().email("Email invalido"),
    senha:z.string().min(6, "A senha deve possuir pelo menos 6 caracteres"),
    idade:z.number().positive("Idade deve ser positiva"),

});
export const updateUserSchema= createUserSchema.partial();