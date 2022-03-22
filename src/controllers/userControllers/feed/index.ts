import { RecipeRepository } from "../../../repositories/RecipeRepository/RecipeRepository";
import { FeedController } from "./feedController";
import { FeedUseCase } from "./feedUseCase";

const recipeRepository = new RecipeRepository();
const feedUseCase = new FeedUseCase(recipeRepository);
export const feedController = new FeedController(feedUseCase);