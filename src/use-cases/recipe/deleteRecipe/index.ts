import { RecipeRepository } from "../../../repositories/RecipeRepository/RecipeRepository";
import { DeleteRecipeController } from "./deleteRecipeController";
import { DeleteRecipeUseCase } from "./deleteRecipeUseCase";

const recipeRepository = new RecipeRepository();
const deleteRecipeUseCase = new DeleteRecipeUseCase(recipeRepository);
export const deleteRecipeController = new DeleteRecipeController(deleteRecipeUseCase);