import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../error/AppError.js";
export function errorHandler(
    error:unknown,
    req: Request,
    res: Response,
    next: NextFunction
){
    if (error instanceof ZodError){
        return res.status(400).json({
            message: "Dados inválidos",
            errors:error.flatten().fieldErrors,
        })
    }
    if (error instanceof AppError){
        return res.status(error.statusCode).json({
            message: error.message,
        });
    }
    return res.status(500).json({
        message:"Erro no sistema",
    })
}