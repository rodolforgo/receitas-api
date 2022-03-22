import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { LoginUseCase } from "./loginUseCase";

export class LoginController {
    constructor(private LoginUseCase: LoginUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const response = await this.LoginUseCase.execute({ email, password });
            res.status(201).send({ token: response });
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}