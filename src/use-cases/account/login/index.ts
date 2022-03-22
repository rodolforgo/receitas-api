import { UserRepository } from "../../../repositories/UserRepository/UserRepository";
import { LoginController } from "./loginController";
import { LoginUseCase } from "./loginUseCase";

const userRepository = new UserRepository();
const loginUseCase = new LoginUseCase(userRepository);
export const loginController = new LoginController(loginUseCase);