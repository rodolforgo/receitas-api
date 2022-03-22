import { SentMessageInfo } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export interface IMailTransporter {
    transporter: Mail<SentMessageInfo>;
    sendMail(email: string, subject: string, html: string): Promise<void>;
}