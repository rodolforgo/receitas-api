import * as bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export class HashManager {
    static async create(s: string): Promise<string> {
        const rounds = Number(process.env.BCRYPT_COST); 
        const salt = await bcrypt.genSalt(rounds);
        const result = await bcrypt.hash(s, salt);
        return result;
    }

    static async compare(s: string, hash: string): Promise<boolean> {
        return bcrypt.compareSync(s, hash);
    }
}