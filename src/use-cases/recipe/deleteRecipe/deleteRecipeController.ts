import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { DeleteRecipeUseCase } from "./deleteRecipeUseCase";

export class DeleteRecipeController {
    constructor(private DeleteRecipeUseCase: DeleteRecipeUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const recipe_id = req.params.id;
            const authorization = req.headers.authorization as string;
            await this.DeleteRecipeUseCase.execute({ authorization, recipe_id });
            res.status(200).send();
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}