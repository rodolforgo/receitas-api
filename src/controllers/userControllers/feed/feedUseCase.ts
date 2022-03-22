import { RecipeFeed } from "../../../entitities/Recipe";
import { IRecipeRepository } from "../../../repositories/IRecipeRepository";
import { Authenticator } from "../../../services/Authenticator";
import { IFeedDTO } from "./feedDTO";

export class FeedUseCase {
    constructor(private IRecipeRepository: IRecipeRepository) { }

    async execute(data: IFeedDTO): Promise<RecipeFeed[]> {
        const userInfo = Authenticator.getTokenData(data.authorization);
        const response = await this.IRecipeRepository.feed(userInfo.id);
        return response;
    }
}