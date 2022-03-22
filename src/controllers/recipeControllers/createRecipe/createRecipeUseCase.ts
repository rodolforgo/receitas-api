import { Recipe } from "../../../entitities/Recipe";
import { IRecipeRepository } from "../../../repositories/IRecipeRepository";
import { Authenticator } from "../../../services/Authenticator";
import { CustomError } from "../../../services/CustomError";
import { ICreateRecipeDTO } from "./createRecipeDTO";

export class CreateRecipeUseCase {
    constructor(private IRecipeRepository: IRecipeRepository) { }

    async execute(data: ICreateRecipeDTO) {
        if (!data.title || !data.description || typeof data.title !== "string" || typeof data.description !== "string" ) {
            throw new CustomError(422, "Parâmentros inválidos ou insuficientes.");
        }
        if (!data.authorization) {
            throw new CustomError(422, "Insira o token de acesso no Authorization.")
        }
        const userInfo = Authenticator.getTokenData(data.authorization);

        const recipe = new Recipe("", data.title, data.description, "", userInfo.id);
        await this.IRecipeRepository.create(recipe);
    }
}