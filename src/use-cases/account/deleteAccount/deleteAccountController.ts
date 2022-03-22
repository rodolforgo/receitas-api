import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { DeleteAccountUseCase } from "./deleteAccountUseCase";

export class DeleteAccountController {
    constructor(private DeleteAccountUseCase: DeleteAccountUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const authorization = req.headers.authorization as string;
            await this.DeleteAccountUseCase.execute({ authorization, id });
            res.status(200).send();
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}