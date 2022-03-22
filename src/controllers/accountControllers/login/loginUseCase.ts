import { IUserRepository } from "../../../repositories/IUserRepository";
import { CustomError } from "../../../services/CustomError";
import { ILoginDTO } from "./loginDTO";
import validator from "validator";
import { HashManager } from "../../../services/HashManager";
import { User } from "../../../entitities/User";
import { Authenticator } from "../../../services/Authenticator";

export class LoginUseCase  {
    constructor(private IUserRepository: IUserRepository) { }

    async execute(data: ILoginDTO) {
        if (!data.email || !data.password || !validator.isEmail(data.email)) {
            throw new CustomError(422, "Parâmetros inválidos");
        }
        
        const userAlreadyExists = await this.IUserRepository.find("email", data.email);
        if (!userAlreadyExists.length) {
            throw new CustomError(401, "Usuário não cadastrado.");
        }

        const user = User.toModel(userAlreadyExists[0]);
        const compare = await HashManager.compare(data.password, user.getPassword());
        
        if (compare) {
            const token = Authenticator.generateToken({ id: user.getId(), role: user.getRole() });
            return token;
        } else {
            throw new CustomError(401, "Usuário ou senha inválida.")
        }
    }
}