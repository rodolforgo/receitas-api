import { IFollowRepository } from "../../../repositories/IFollowRepository";
import { IRecipeRepository } from "../../../repositories/IRecipeRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { Authenticator } from "../../../services/Authenticator";
import { CustomError } from "../../../services/CustomError";
import { IDeleteAccountDTO } from "./deleteAccountDTO";

export class DeleteAccountUseCase {
    constructor(
        private IUserRepository: IUserRepository,
        private IRecipeRepository: IRecipeRepository,
        private IFollowRepository: IFollowRepository
    ) { }

    async execute(data: IDeleteAccountDTO) {
        if (!data.authorization) {
            throw new CustomError(422, "Insira o token de acesso no Authorization.")
        }

        const userInfo = Authenticator.getTokenData(data.authorization);

        let deleteId;
        if (data.id && userInfo.role === "admin") { deleteId = data.id; }
        if (!data.id) { deleteId = userInfo.id; }

        const userAlreadyExists = await this.IUserRepository.find("id", deleteId);
        if (!userAlreadyExists.length) { throw new CustomError(401, "Usuário não cadastrado."); }
        
        await this.IFollowRepository.delete("user_id", deleteId);
        await this.IFollowRepository.delete("follow_id", deleteId);
        await this.IRecipeRepository.delete("user_id", deleteId);
        await this.IUserRepository.delete("id", deleteId);
    }
}
