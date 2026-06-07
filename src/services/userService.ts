import { AppError } from "../error/AppError.js";
import { UserRepository } from "../repositories/UserRepository.js";

const userRepository = new UserRepository();

export class UserService {
    async create(nome: string, email: string, senha: string, idade: number) {
        const usuarioExiste = await userRepository.findByEmail(email);
        if (usuarioExiste) {
            throw new AppError("Email já cadastrado", 400);
        }
        return userRepository.create({ nome, email, senha, idade });
    }

    async list() {
        const users = await userRepository.findAll();
        return users.map(({ senha, ...resto }) => resto);
    }

    async findById(id: number) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }
        const { senha, ...resto } = user;
        return resto;
    }

    async update(id: number, nome: string, email: string, senha: string, idade: number) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }

        if (email && email !== user.email) {
            const emailExiste = await userRepository.findByEmail(email);
            if (emailExiste) {
                throw new AppError("Email já cadastrado", 400);
            }
        }

        user.nome = nome;
        user.email = email;
        user.senha = senha;
        user.idade = idade;
        return userRepository.save(user);
    }

    async delete(id: number) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }
        await userRepository.remove(user);
    }
}