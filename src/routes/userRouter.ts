import express from "express";
import { Request, Response } from "express";
import { deleteAccountController } from "../use-cases/account/deleteAccount";
import { followUseController } from "../use-cases/user/followUser";
import { getProfileByIdController } from "../use-cases/user/getProfileById";
import { unfollowUseController } from "../use-cases/user/unfollowUser";

export const userRouter = express.Router();

userRouter.post("/follow", (req: Request, res: Response) => { followUseController.execute(req, res); });
userRouter.post("/unfollow", (req: Request, res: Response) => { unfollowUseController.execute(req, res); });
userRouter.get("/profile", (req: Request, res: Response) => { getProfileByIdController.execute(req, res); });
userRouter.get("/:id", (req: Request, res: Response) => { getProfileByIdController.execute(req, res); });
userRouter.delete("/user/:id?", (req: Request, res: Response) => { deleteAccountController.execute(req, res); });
