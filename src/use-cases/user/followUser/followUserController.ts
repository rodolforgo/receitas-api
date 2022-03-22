import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { FollowUserUseCase } from "./followUserUseCase";

export class FollowUserController {
    constructor(private FollowUserUseCase: FollowUserUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                throw new CustomError(422, "Insira um token de acesso válido.");
            }
            const userToFollowId = req.body.userToFollowId;
            const response = await this.FollowUserUseCase.execute({ authorization, userToFollowId });
            res.status(201).send({ message: response });
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}