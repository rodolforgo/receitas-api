import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { IMailTransporter } from "./IMailTransporter";
import { CustomError } from "../CustomError";

dotenv.config();

export class MailTransporter implements IMailTransporter {
    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        },
        tls: { ciphers: "SSLv3" }
    });

    async sendMail(email: string, subject: string, html: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: `<${process.env.NODEMAILER_USER}>`,
                to: email,
                subject,
                html
            });
        } catch (err: any) {
            throw new CustomError(500, err.message);
        }
    }
}