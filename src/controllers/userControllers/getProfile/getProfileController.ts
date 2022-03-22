import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { GetProfileUseCase } from "./getProfileUseCase";

export class GetProfileController {
    constructor(private GetProfileUseCase: GetProfileUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                throw new CustomError(422, "Insira um token de acesso válido.");
            }

            const response = await this.GetProfileUseCase.execute({ authorization });
            res.status(201).send(response);
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}