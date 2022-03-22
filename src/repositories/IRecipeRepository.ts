import { Recipe, RecipeFeed } from "../entitities/Recipe";

export interface IRecipeRepository {
    find(dataColumn: string, whereColumn: string): Promise<Recipe[]>;
    create(user: Recipe): Promise<void>;
    feed(id: string): Promise<RecipeFeed[]>;
    update(recipe_id: string, title?: string, description?: string): Promise<void>;
    delete(whereColumn: string, where: string): Promise<void>; 
}