import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { UnfollowUserUseCase } from "./unfollowUserUseCase";

export class UnfollowUserController {
    constructor(private UnfollowUserUseCase: UnfollowUserUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                throw new CustomError(422, "Insira um token de acesso válido.");
            }
            const userToUnfollowId = req.body.userToUnfollowId;
            const response = await this.UnfollowUserUseCase.execute({ authorization, userToUnfollowId });
            res.status(201).send({ message: response });
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}