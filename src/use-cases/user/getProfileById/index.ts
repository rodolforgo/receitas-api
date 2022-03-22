import { UserRepository } from "../../../repositories/UserRepository/UserRepository";
import { GetProfileByIdController } from "./getProfileByIdController";
import { GetProfileByIdUseCase } from "./getProfileByIdUseCase";

const userRepository = new UserRepository()
const getProfileByIdUseCase = new GetProfileByIdUseCase(userRepository);
export const getProfileByIdController = new GetProfileByIdController(getProfileByIdUseCase);