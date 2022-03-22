import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { SignupUseCase } from "./signupUseCase";

export class SignupController {
    constructor(private SignupUseCase: SignupUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, role } = req.body;
            const token = await this.SignupUseCase.execute({ name, email, password, role });
            res.status(201).send({ token: token });
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}