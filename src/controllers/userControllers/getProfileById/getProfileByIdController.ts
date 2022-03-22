import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { GetProfileByIdUseCase } from "./getProfileByIdUseCase";

export class GetProfileByIdController {
    constructor(private GetProfileByIdUseCase: GetProfileByIdUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const authorization = req.headers.authorization;
            const id = req.params.id;

            if (!authorization) {
                throw new CustomError(422, "Insira um token de acesso válido.")
            }
            const response = await this.GetProfileByIdUseCase.execute({ authorization, id });
            res.status(201).send(response);
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}