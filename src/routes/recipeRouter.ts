import express from "express";
import { Request, Response } from "express";
import { createRecipeController } from "../use-cases/recipe/createRecipe";
import { deleteRecipeController } from "../use-cases/recipe/deleteRecipe";
import { editRecipeController } from "../use-cases/recipe/editRecipe";
import { getRecipeByIdController } from "../use-cases/recipe/getRecipeById";

export const recipeRouter = express.Router();

recipeRouter.post("/", (req: Request, res: Response) => { createRecipeController.execute(req, res); });
recipeRouter.put("/edit", (req: Request, res: Response)=> { editRecipeController.execute(req, res); });
recipeRouter.get("/:id", (req: Request, res: Response) => { getRecipeByIdController.execute(req, res); });
recipeRouter.delete("/:id", (req: Request, res: Response) => { deleteRecipeController.execute(req, res); });