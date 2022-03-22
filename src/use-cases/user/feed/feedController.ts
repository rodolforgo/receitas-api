import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { FeedUseCase } from "./feedUseCase";

export class FeedController {
    constructor(private FeedUseCase: FeedUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                throw new CustomError(422, "Insira um token de acesso válido.");
            }
            const response = await this.FeedUseCase.execute({ authorization });
            res.status(201).send(response);
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}