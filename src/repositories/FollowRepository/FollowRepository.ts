import { BaseDatabase } from "../../data/BaseDatabase";
import { Follow } from "../../entitities/Follow";
import { CustomError } from "../../services/CustomError";
import { IFollowRepository } from "../IFollowRepository";

export class FollowRepository implements IFollowRepository {
    constructor(private repo?: string) {
        this.repo = "cookenu_followers";
    }

    async follow(user_id: string, userToFollowId: string): Promise<void> {
        try {
            const userAlreadyFollows = await BaseDatabase.connection(this.repo).select().where("user_id", user_id).andWhere("follow_id", userToFollowId);
            if (userAlreadyFollows.length) {
                throw new CustomError(409, `O ID ${user_id} já segue o ID ${userToFollowId}.`);
            } else {
                const follow = new Follow("", user_id, userToFollowId);
                await BaseDatabase.connection(this.repo).insert(follow);
            }
        } catch (err: any) {
            throw new CustomError(400, err.sqlMessage || err.message);
        }
    }

    async unfollow(user_id: string, userToFollowId: string): Promise<void> {
        try {
            const userAlreadyFollows = await BaseDatabase.connection(this.repo).select().where("user_id", user_id).andWhere("follow_id", userToFollowId);
            if (!userAlreadyFollows.length) {
                throw new CustomError(409, `O ID ${user_id} não segue o ID ${userToFollowId}.`);
            } else {
                await BaseDatabase.connection(this.repo).where("user_id", user_id).andWhere("follow_id", userToFollowId).delete();
            }
        } catch (err: any) {
            throw new CustomError(400, err.sqlMessage || err.message);
        }
    }

    async delete(whereColumn: string, where: string): Promise<void> {
        try {
            await BaseDatabase.connection(this.repo).delete().where(whereColumn, where);
        } catch (err: any) {
            throw new CustomError(500, err.sqlMessage);
        }
    }
}