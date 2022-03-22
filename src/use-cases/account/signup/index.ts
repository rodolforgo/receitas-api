import { UserRepository } from "../../../repositories/UserRepository/UserRepository";
import { SignupController } from "./signupController";
import { SignupUseCase } from "./signupUseCase";

const userRepository = new UserRepository();
const signupUseCase = new SignupUseCase(userRepository);
export const signupController = new SignupController(signupUseCase);