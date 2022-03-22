import { IUserRepository } from "../../../repositories/IUserRepository";
import { Authenticator } from "../../../services/Authenticator";
import { CustomError } from "../../../services/CustomError";
import { HashManager } from "../../../services/HashManager";
import { IChangePasswordDTO } from "./changePasswordDTO";

export class ChangePasswordUseCase {
    constructor(private IUserRepository: IUserRepository) { }

    async execute(data: IChangePasswordDTO) {
        if (!data.password || !data.token) {
            throw new CustomError(422, "Parâmetros inválidos.");
        }
        if (typeof data.password !== "string" || data.password.length < 6) {
            throw new CustomError(422, "Mínimo de caracteres no 'password': 6.")
        }

        const userInfo = Authenticator.getTokenEmail(data.token);

        const userAlreadyExists = await this.IUserRepository.find("email", userInfo.email);
        if (!userAlreadyExists.length) {
            throw new CustomError(409, "E-mail inexistente.");
        }

        const newPassword = await HashManager.create(data.password);
        await this.IUserRepository.update("email", userInfo.email, "password", newPassword);
    }
}