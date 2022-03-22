import { UserRepository } from "../../../repositories/UserRepository/UserRepository";
import { MailTransporter } from "../../../services/mailTransporter/mailTransporter";
import { ForgotPasswordController } from "./forgotPasswordController";
import { ForgotPasswordUseCase } from "./forgotPasswordUseCase";

const userRepository = new UserRepository();
const mailTransporter = new MailTransporter();
const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository, mailTransporter)
export const forgotPasswordController = new ForgotPasswordController(forgotPasswordUseCase);