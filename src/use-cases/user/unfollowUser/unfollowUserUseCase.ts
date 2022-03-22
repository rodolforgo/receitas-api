import { IFollowRepository } from "../../../repositories/IFollowRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { Authenticator } from "../../../services/Authenticator";
import { CustomError } from "../../../services/CustomError";
import { IUnfollowUserDTO } from "./unfollowUserDTO";

export class UnfollowUserUseCase {
    constructor(
        private IFollowRepository: IFollowRepository,
        private IUserRepository: IUserRepository
        ) {}

    async execute(data: IUnfollowUserDTO): Promise<string> {
        if (!data.userToUnfollowId) {
            throw new CustomError(422, "Parâmetros inválidos.")
        }

        const userInfo = Authenticator.getTokenData(data.authorization);
        
        const findUser = await this.IUserRepository.find("id", data.userToUnfollowId);
        if (!findUser.length) {
            throw new CustomError(422, "ID de usuário inválido.");
        }

        await this.IFollowRepository.unfollow(userInfo.id, data.userToUnfollowId);
        return "Unfollowed successfully";
    }
}