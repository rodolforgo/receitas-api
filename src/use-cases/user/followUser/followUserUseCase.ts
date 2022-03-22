import { IFollowRepository } from "../../../repositories/IFollowRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { Authenticator } from "../../../services/Authenticator";
import { CustomError } from "../../../services/CustomError";
import { IFollowUserDTO } from "./followUserDTO";

export class FollowUserUseCase {
    constructor(
        private IFollowRepository: IFollowRepository,
        private IUserRepository: IUserRepository
        ) {}

    async execute(data: IFollowUserDTO): Promise<string> {
        if (!data.userToFollowId) {
            throw new CustomError(422, "Parâmetros inválidos.")
        }

        const userInfo = Authenticator.getTokenData(data.authorization);
        
        const findUser = await this.IUserRepository.find("id", data.userToFollowId);
        if (!findUser.length) {
            throw new CustomError(422, "ID de usuário inválido.");
        }

        await this.IFollowRepository.follow(userInfo.id, data.userToFollowId);
        return "Followed successfully";
    }
}