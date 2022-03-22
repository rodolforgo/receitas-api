import { IdGenerator } from "../services/idGenerator";

export enum USER_ROLES {
    NORMAL = "normal",
    ADMIN = "admin",
}

export class Recipe {
    constructor(
        protected id: string,
        protected title: string,
        protected description: string,
        protected createdAt: Date | string,
        protected user_id: string,
    ) {
        if (!id) {
            this.id = IdGenerator.execute();
        }

        if (!createdAt) {
            this.createdAt = new Date();
        }

        if (createdAt) {
            this.createdAt = new Date(createdAt).toLocaleDateString();
        }
    }

    getId(): string {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getCreatedAt(): Date | string {
        return this.createdAt;
    }

    getUserId(): string {
        return this.user_id;
    }

    static toModel(data: any) {
        return new Recipe(data.id, data.title, data.description, data.createdAt, data.user_id);
    }
}

export class RecipeFeed extends Recipe {
    constructor(
        protected id: string,
        protected title: string,
        protected description: string,
        protected createdAt: Date | string,
        protected user_id: string,
        protected user_name: string) {
        super(id, title, description, createdAt, user_id)
        this.user_name = user_name;

        if (createdAt) {
            this.createdAt = new Date(createdAt).toLocaleDateString();
        }
    }

    static toModel(data: any) {
        return new RecipeFeed(data.id, data.title, data.description, data.createdAt, data.user_id, data.name);
    }
}