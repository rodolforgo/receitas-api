import { Recipe } from "../../../entitities/Recipe";
import { IRecipeRepository } from "../../../repositories/IRecipeRepository";
import { Authenticator } from "../../../services/Authenticator";
import { CustomError } from "../../../services/CustomError";
import { IGetRecipeByIdDTO } from "./getRecipeByIdDTO";

export class GetRecipeByIdUseCase {
    constructor(private IRecipeRepository: IRecipeRepository) { }

    async execute(data: IGetRecipeByIdDTO): Promise<any> {
        if (!data.authorization || !data.id) {
            throw new CustomError(422, "Parâmetros inválidos ou insuficientes.")
        }
        
        Authenticator.getTokenData(data.authorization);

        const findRecipe = await this.IRecipeRepository.find("id", data.id);

        if (!findRecipe.length) {
            throw new CustomError(422, "ID de receita não encontrado.");
        }
        else {
            const recipe = Recipe.toModel(findRecipe[0]);
            return {
                id: recipe.getId(),
                title: recipe.getTitle(),
                description: recipe.getDescription(),
                createdAt: recipe.getCreatedAt()
            }
        }
    }
}