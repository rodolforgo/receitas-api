import { RecipeRepository } from "../../../repositories/RecipeRepository/RecipeRepository";
import { EditRecipeController } from "./editRecipeController";
import { EditRecipeUseCase } from "./editRecipeUseCase";

const recipeRepository = new RecipeRepository();
const editRecipeUseCase = new EditRecipeUseCase(recipeRepository);
export const editRecipeController = new EditRecipeController(editRecipeUseCase);