import { User } from "../entitities/User";

export interface IUserRepository {
    find(dataColumn: string, whereColumn: string): Promise<User[]>;
    create(user: User): Promise<void>;
    delete(whereColumn: string, where: string): Promise<void>; 
    update(whereColumn: string, where: string, dataColumn: string, data: string): Promise<void>;
}