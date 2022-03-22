import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { GetRecipeByIdUseCase } from "./getRecipeByIdUseCase";

export class GetRecipeByIdController {
    constructor(private GetRecipeByIdUseCase: GetRecipeByIdUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const authorization = req.headers.authorization;
            const id = req.params.id;

            if (!authorization) {
                throw new CustomError(422, "Insira um token de acesso válido.")
            }

            const response = await this.GetRecipeByIdUseCase.execute({ authorization, id });
            res.status(200).send(response);
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}