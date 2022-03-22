import express from "express";
import { Request, Response } from "express";
import { changePasswordController } from "../use-cases/account/changePassword";
import { forgotPasswordController } from "../use-cases/account/forgotPassword";
import { loginController } from "../use-cases/account/login";
import { signupController } from "../use-cases/account/signup";
import { feedController } from "../use-cases/user/feed";

export const accountRouter = express.Router();

accountRouter.post("/signup", (req: Request, res: Response) => { signupController.execute(req, res); });
accountRouter.post("/login", (req: Request, res: Response) => { loginController.execute(req, res); });
accountRouter.post("/forgot_password", (req: Request, res: Response) => { forgotPasswordController.execute(req, res); });
accountRouter.post("/change_password", (req: Request, res: Response) => { changePasswordController.execute(req, res); });
accountRouter.get("/feed", (req: Request, res: Response) => { feedController.execute(req, res); });