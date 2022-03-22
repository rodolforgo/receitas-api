import { UserRepository } from "../../../repositories/UserRepository/UserRepository";
import { ChangePasswordController } from "./changePasswordController";
import { ChangePasswordUseCase } from "./changePasswordUseCase";

const userRepository = new UserRepository();
const changePasswordUseCase = new ChangePasswordUseCase(userRepository);
export const changePasswordController = new ChangePasswordController(changePasswordUseCase);