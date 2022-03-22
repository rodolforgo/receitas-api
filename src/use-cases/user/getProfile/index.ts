import { UserRepository } from "../../../repositories/UserRepository/UserRepository";
import { GetProfileController } from "./getProfileController";
import { GetProfileUseCase } from "./getProfileUseCase";

const userRepository = new UserRepository()
const getProfileUseCase = new GetProfileUseCase(userRepository);
export const getProfileController = new GetProfileController(getProfileUseCase);