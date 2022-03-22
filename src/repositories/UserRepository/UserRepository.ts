import { BaseDatabase } from "../../data/BaseDatabase";
import { User } from "../../entitities/User";
import { CustomError } from "../../services/CustomError";
import { IUserRepository } from "../IUserRepository";

export class UserRepository implements IUserRepository {
    constructor(private repo?: string) {
        this.repo = "cookenu_users";
    }

    async find(column: string, where: string): Promise<User[]> {
        try {
            const response = await BaseDatabase.connection(this.repo).select().where(column, "=", where);
            return response;
        } catch (err: any) {
            throw new CustomError(500, err.sqlMessage);
        }
    }

    async create(user: User): Promise<void> {
        try {
            await BaseDatabase.connection(this.repo).insert(user);
        } catch (err: any) {
            throw new CustomError(500, err.sqlMessage);
        }
    }

    async delete(whereColumn: string, where: string): Promise<void> {
        try {
            await BaseDatabase.connection(this.repo).delete().where(whereColumn, where);
        } catch (err: any) {
            throw new CustomError(500, err.sqlMessage);
        }
    }

    async update(whereColumn: string, where: string, dataColumn: string, data: string): Promise<void> {
        try {
            await BaseDatabase.connection(this.repo).update(dataColumn, data).where(whereColumn, where);
        } catch (err: any) {
            throw new CustomError(500, err.sqlMessage);
        }
    }
}