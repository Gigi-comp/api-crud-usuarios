import { AppDataSource } from "../database/db.js";
import { User } from "../models/User.js";

const repository = AppDataSource.getRepository(User);

export class UserRepository {
    async findByEmail(email: string) {
        return repository.findOne({ where: { email } });
    }

    async findById(id: number) {
        return repository.findOne({ where: { id } });
    }

    async findAll() {
        return repository.find();
    }

    async create(dados: Partial<User>) {
        const user = repository.create(dados);
        return repository.save(user);
    }

    async save(user: User) {
        return repository.save(user);
    }

    async remove(user: User) {
        return repository.remove(user);
    }
}