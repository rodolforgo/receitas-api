import { User } from "../../../entitities/User";
import { CustomError } from "../../../services/CustomError";
import validator from "validator";
import { ICreateUserDTO } from "./signupDTO";
import { HashManager } from "../../../services/HashManager";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { Authenticator } from "../../../services/Authenticator";

export class SignupUseCase {
    constructor(private IUserRepository: IUserRepository) {}
    
    async execute(data: ICreateUserDTO): Promise<string | undefined> {
        if (!data.name || !data.email || !data.password || !data.role) {
            throw new CustomError(422, "Parâmetros inválidos.");
        }
        if (!validator.isEmail(data.email)) {
            throw new CustomError(422, "E-mail inválido.");
        }
        if (typeof data.password !== "string" || data.password.length < 6) {
            throw new CustomError(422, "Mínimo de caracteres no 'password': 6.")
        }

        const userAlreadyExists = await this.IUserRepository.find("email", data.email);
        if (userAlreadyExists && userAlreadyExists.length) {
            throw new CustomError(409, "E-mail já cadastrado.");
        }

        const newPassword = await HashManager.create(data.password)
        const user = new User("", data.name, data.email, newPassword, data.role);
        await this.IUserRepository.create(user);
        const token = Authenticator.generateToken({ id: user.getId(), role: user.getRole() } );
        return token;
    }
}