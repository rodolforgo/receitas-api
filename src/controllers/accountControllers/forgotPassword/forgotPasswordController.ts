import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { ForgotPasswordUseCase } from "./forgotPasswordUseCase";

export class ForgotPasswordController {
    constructor(private ForgotPasswordUseCase: ForgotPasswordUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const email = req.body.email;
            await this.ForgotPasswordUseCase.execute({ email });
            res.status(200).send();
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}