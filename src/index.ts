import { app } from "./app";
import { userRouter } from "./routes/userRouter";
import { accountRouter } from "./routes/accountRouter";
import { recipeRouter } from "./routes/recipeRouter";

app.use("/", accountRouter);
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);



