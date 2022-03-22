import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { EditRecipeUseCase } from "./editRecipeUseCase";

export class EditRecipeController {
    constructor(private EditRecipeUseCase: EditRecipeUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { recipe_id, title, description } = req.body;
            const authorization = req.headers.authorization as string;
            await this.EditRecipeUseCase.execute({ authorization, recipe_id, title, description });
            res.status(200).send();
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}