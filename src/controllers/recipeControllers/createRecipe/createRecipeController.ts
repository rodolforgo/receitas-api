import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { CreateRecipeUseCase } from "./createRecipeUseCase";

export class CreateRecipeController {
    constructor(private CreateRecipeUseCase: CreateRecipeUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { title, description } = req.body;
            const authorization = req.headers.authorization as string;
            await this.CreateRecipeUseCase.execute({ authorization, title, description });
            res.status(201).send();
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}