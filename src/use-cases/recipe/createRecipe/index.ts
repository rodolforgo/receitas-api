import { RecipeRepository } from "../../../repositories/RecipeRepository/RecipeRepository";
import { CreateRecipeController } from "./createRecipeController";
import { CreateRecipeUseCase } from "./createRecipeUseCase";

const recipeRepository = new RecipeRepository();
const createRecipeUseCase = new CreateRecipeUseCase(recipeRepository);
export const createRecipeController = new CreateRecipeController(createRecipeUseCase);
