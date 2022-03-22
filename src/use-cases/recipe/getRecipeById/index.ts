import { RecipeRepository } from "../../../repositories/RecipeRepository/RecipeRepository";
import { GetRecipeByIdController } from "./getRecipeByIdController";
import { GetRecipeByIdUseCase } from "./getRecipeByIdUseCase";

const recipeRepository = new RecipeRepository();
const getRecipeByIdUseCase = new GetRecipeByIdUseCase(recipeRepository);
export const getRecipeByIdController = new GetRecipeByIdController(getRecipeByIdUseCase);