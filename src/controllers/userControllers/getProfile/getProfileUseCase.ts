import { User, UserInfo } from "../../../entitities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { Authenticator } from "../../../services/Authenticator";
import { CustomError } from "../../../services/CustomError";
import { IGetProfileDTO } from "./getProfileDTO";

export class GetProfileUseCase {
    constructor(private IUserRepository: IUserRepository) { }

    async execute(data: IGetProfileDTO): Promise<UserInfo> {
        const userInfo = Authenticator.getTokenData(data.authorization);
        const result = await this.IUserRepository.find("id", userInfo.id);
        const user = User.toModel(result[0]);
        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail()

        }
    }
}