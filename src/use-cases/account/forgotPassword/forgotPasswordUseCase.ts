import { IUserRepository } from "../../../repositories/IUserRepository";
import { CustomError } from "../../../services/CustomError";
import { IMailTransporter } from "../../../services/mailTransporter/IMailTransporter";
import { IForgotPasswordDTO } from "./forgotPasswordDTO";
import validator from "validator";
import { User } from "../../../entitities/User";
import { Authenticator } from "../../../services/Authenticator";

export class ForgotPasswordUseCase {
    constructor(
        private IUserRepository: IUserRepository,
        private IMailTransporter: IMailTransporter) { }

    async execute(data: IForgotPasswordDTO) {
        if (!data.email || !validator.isEmail(data.email)) {
            throw new CustomError(422, "Insira um e-mail no body.")
        }

        const emailAlreadyExists = await this.IUserRepository.find("email", data.email);
        if (!emailAlreadyExists.length) {
            throw new CustomError(401, "E-mail não cadastrado.")
        }

        const user = User.toModel(emailAlreadyExists[0])
        const tokenPassword = Authenticator.generateTokenEmail({ email: user.getEmail() });
        await this.IMailTransporter.sendMail(
            user.getEmail(),
            "Recuperação de senha",
            `<p>Olá, ${user.getName()}. :)</p>
        <p>Recebemos um pedido de <b>recuperação de senha</b> da sua conta Cookenu.</p>
        <p>Por favor, copie e cole o código abaixo e insira na área de redefinição de senha para efetuar a operação.</p>
        <em>${tokenPassword}</em>
        <br />
        <p>Atenciosamente, Cookenu. :}</p>
        `);
    }
}