import { IdGenerator } from "../services/idGenerator";

export class Follow {
    constructor(
        private id: string,
        private user_id: string,
        private follow_id: string
    ) {
        if (!id) {
            this.id = IdGenerator.execute();
        }
    }

    getId(): string {
        return this.id;
    }

    getUserId(): string {
        return this.user_id;
    }

    getFollowId(): string {
        return this.follow_id;
    }

    toModal(data: any) {
        return new Follow(data.id, data.user_id, data.follow_id);
    }
}