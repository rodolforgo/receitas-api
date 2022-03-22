import { Recipe } from "../../../entitities/Recipe";
import { IRecipeRepository } from "../../../repositories/IRecipeRepository";
import { Authenticator } from "../../../services/Authenticator";
import { CustomError } from "../../../services/CustomError";
import { IDeleteRecipeDTO } from "./deleteRecipeDTO";

export class DeleteRecipeUseCase {
    constructor(private IRecipeRepository: IRecipeRepository) {}

    async execute(data: IDeleteRecipeDTO) {
        if (!data.recipe_id) {
            throw new CustomError(422, "Parâmentros inválidos ou insuficientes.");
        }
        if (!data.authorization) {
            throw new CustomError(422, "Insira o token de acesso no Authorization.")
        }
        const userInfo = Authenticator.getTokenData(data.authorization);

        const recipeAlreadyExists = await this.IRecipeRepository.find("id", data.recipe_id);
        if (!recipeAlreadyExists.length) {
            throw new CustomError(422, "Receita inexistente, verifique o ID inserido.")
        }

        const recipe = Recipe.toModel(recipeAlreadyExists[0]);
        
        if (recipe.getUserId() !== userInfo.id && userInfo.role === "normal") {
            throw new CustomError(401, "Receita não pertence a este usuário.")
        }
        await this.IRecipeRepository.delete("id", data.recipe_id);
    }
}