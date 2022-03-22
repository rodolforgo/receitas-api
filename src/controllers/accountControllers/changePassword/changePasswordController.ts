import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { ChangePasswordUseCase } from "./changePasswordUseCase";

export class ChangePasswordController {
    constructor(private ChangePasswordUseCase: ChangePasswordUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { token, password } = req.body;
            const response = await this.ChangePasswordUseCase.execute({ token, password });
            res.status(201).send();
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}