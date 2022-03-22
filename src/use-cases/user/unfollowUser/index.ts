import { FollowRepository } from "../../../repositories/FollowRepository/FollowRepository";
import { UserRepository } from "../../../repositories/UserRepository/UserRepository";
import { UnfollowUserController } from "./unfollowUserController";
import { UnfollowUserUseCase } from "./unfollowUserUseCase";

const followRepository = new FollowRepository();
const userRepository = new UserRepository();
const unfollowUserUseCase = new UnfollowUserUseCase(followRepository, userRepository);
export const unfollowUseController = new UnfollowUserController(unfollowUserUseCase);