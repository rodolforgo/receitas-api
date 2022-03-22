import { User, UserInfo } from "../../../entitities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { Authenticator } from "../../../services/Authenticator";
import { CustomError } from "../../../services/CustomError";
import { IGetProfileByIdDTO } from "./getProfileByIdDTO";

export class GetProfileByIdUseCase {
    constructor(private IUserRepository: IUserRepository) { }

    async execute(data: IGetProfileByIdDTO): Promise<any> {
        if (!data.id) {
            throw new CustomError(422, "Parâmetros inválidos.")
        }

        const userInfo = Authenticator.getTokenData(data.authorization);
        const findUser = await this.IUserRepository.find("id", data.id);
        if (!findUser.length) {
            throw new CustomError(422, "ID de usuário inválido.");
        }
        else {
            const user = User.toModel(findUser[0]);
            return {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail()
            }
        }
    }
}