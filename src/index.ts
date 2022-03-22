import { app } from "./app";
import { Request, Response } from "express";
import { createRecipeController } from "./controllers/recipeControllers/createRecipe";
import { getProfileController } from "./controllers/userControllers/getProfile";
import { getProfileByIdController } from "./controllers/userControllers/getProfileById";
import { loginController } from "./controllers/accountControllers/login";
import { signupController } from "./controllers/accountControllers/signup";
import { getRecipeByIdController } from "./controllers/recipeControllers/getRecipeById";
import { followUseController } from "./controllers/userControllers/followUser";
import { unfollowUseController } from "./controllers/userControllers/unfollowUser";
import { feedController } from "./controllers/userControllers/feed";
import { editRecipeController } from "./controllers/recipeControllers/editRecipe";
import { deleteRecipeController } from "./controllers/recipeControllers/deleteRecipe";
import { deleteAccountController } from "./controllers/accountControllers/deleteAccount";
import { forgotPasswordController } from "./controllers/accountControllers/forgotPassword";
import { changePasswordController } from "./controllers/accountControllers/changePassword";

// accounts:
app.post("/signup", (req: Request, res: Response) => { signupController.execute(req, res); });
app.post("/login", (req: Request, res: Response) => { loginController.execute(req, res); });
app.delete("/user/:id?", (req: Request, res: Response) => { deleteAccountController.execute(req, res); });
app.post("/forgot_password", (req: Request, res: Response) => { forgotPasswordController.execute(req, res); });
app.post("/change_password", (req: Request, res: Response) => { changePasswordController.execute(req, res); });

// users:
app.post("/user/follow", (req: Request, res: Response) => { followUseController.execute(req, res); });
app.post("/user/unfollow", (req: Request, res: Response) => { unfollowUseController.execute(req, res); });

app.get("/user/profile", (req: Request, res: Response) => { getProfileController.execute(req, res); });
app.get("/user/:id", (req: Request, res: Response) => { getProfileByIdController.execute(req, res); });

app.get("/feed", (req: Request, res: Response) => { feedController.execute(req, res); });

// recipes:
app.post("/recipe", (req: Request, res: Response) => { createRecipeController.execute(req, res); });
app.put("/recipe/edit", (req: Request, res: Response)=> { editRecipeController.execute(req, res); });
app.get("/recipe/:id", (req: Request, res: Response) => { getRecipeByIdController.execute(req, res); });
app.delete("/recipe/:id", (req: Request, res: Response) => { deleteRecipeController.execute(req, res); });
