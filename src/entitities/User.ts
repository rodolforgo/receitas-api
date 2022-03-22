import { IdGenerator } from "../services/idGenerator";

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: string
    ) {
        if (!id) {
            this.id = IdGenerator.execute();
        }
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): string {
        return this.role;
    }

    static toModel(data: any) {
        return new User(data.id, data.name, data.email, data.password, data.role);
    }
}

export interface UserInfo {
    id: string;
    name: string;
    email: string;
}
