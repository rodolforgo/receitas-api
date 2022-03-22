import { v4 } from "uuid"

export class IdGenerator {
    static execute(): string {
        return v4();
    }
}