export interface IFollowRepository {
    follow(user_id: string, userToFollowId: string): Promise<void>;
    unfollow(user_id: string, userToFollowId: string): Promise<void>;
    delete(whereColumn: string, where: string): Promise<void>; 
}