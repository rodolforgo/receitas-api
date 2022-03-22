import { FollowRepository } from "../../../repositories/FollowRepository/FollowRepository";
import { RecipeRepository } from "../../../repositories/RecipeRepository/RecipeRepository";
import { UserRepository } from "../../../repositories/UserRepository/UserRepository";
import { DeleteAccountController } from "./deleteAccountController";
import { DeleteAccountUseCase } from "./deleteAccountUseCase";

const userRepository = new UserRepository();
const recipeRepository = new RecipeRepository();
const followRepository = new FollowRepository();
const deleteAccountUseCase = new DeleteAccountUseCase(userRepository, recipeRepository, followRepository);
export const deleteAccountController = new DeleteAccountController(deleteAccountUseCase);