import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService.js";

const userService = new UserService();

export class UserController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { nome, idade, email, senha } = req.body;
            const user = await userService.create(nome, email, senha, idade);
            return res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.list();
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.findById(Number(id));
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { nome, idade, email, senha } = req.body;
            const user = await userService.update(Number(id), nome, email, senha, idade);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await userService.delete(Number(id));
            return res.json({ message: "Usuário deletado" });
        } catch (error) {
            next(error);
        }
    }
}