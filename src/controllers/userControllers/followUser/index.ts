import { FollowRepository } from "../../../repositories/FollowRepository/FollowRepository";
import { UserRepository } from "../../../repositories/UserRepository/UserRepository";
import { FollowUserController } from "./followUserController";
import { FollowUserUseCase } from "./followUserUseCase";

const followRepository = new FollowRepository();
const userRepository = new UserRepository();
const followUserUseCase = new FollowUserUseCase(followRepository, userRepository);
export const followUseController = new FollowUserController(followUserUseCase);