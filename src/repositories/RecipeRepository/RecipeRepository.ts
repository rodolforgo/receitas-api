import { BaseDatabase } from "../../data/BaseDatabase";
import { Recipe, RecipeFeed } from "../../entitities/Recipe";
import { CustomError } from "../../services/CustomError";
import { IRecipeRepository } from "../IRecipeRepository";

export class RecipeRepository implements IRecipeRepository {
    constructor(private repo?: string) {
        this.repo = "cookenu_recipes";
    }

    async find(column: string, where: string): Promise<Recipe[]> {
        try {
            const response = await BaseDatabase.connection(this.repo).select().where(column, "=", where);
            return response;
        } catch (err: any) {
            throw new CustomError(500, err.sqlMessage);
        }
    }

    async create(recipe: Recipe): Promise<void> {
        try {
            await BaseDatabase.connection(this.repo).insert(recipe);
        } catch (err: any) {
            throw new CustomError(500, err.sqlMessage);
        }
    }

    async feed(id: string): Promise<RecipeFeed[]> {
        try {
            const response: RecipeFeed[] = await BaseDatabase.connection(this.repo)
                .select("cookenu_recipes.*", "cookenu_users.name")
                .from("cookenu_followers")
                .join("cookenu_recipes", "cookenu_followers.follow_id", "=", "cookenu_recipes.user_id")
                .join("cookenu_users", "cookenu_users.id", "=", "cookenu_followers.follow_id")
                .where("cookenu_followers.user_id", id);
            const result = response.map((item) => RecipeFeed.toModel(item));
            return result;
        } catch (err: any) {
            throw new CustomError(500, err.sqlMessage);
        }
    }

    async update(recipe_id: string, title?: string, description?: string): Promise<void> {
        try {
            await BaseDatabase.connection(this.repo).update({ title: title, description: description }).where({ id: recipe_id });
        } catch (err: any) {
            throw new CustomError(500, err.sqlMessage);
        }
    }

    async delete(whereColumn: string, where: string) {
        try {
            await BaseDatabase.connection(this.repo).delete().where(whereColumn, where);
        } catch (err: any) {
            throw new CustomError(500, err.sqlMessage);
        }
    }
}