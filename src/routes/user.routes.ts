import {Router} from "express";

import userAuthenticated from "../middlewares/userAuthenticated";

import UserController from "../resources/user/user.controller";

const userRouter = Router();

userRouter.post("/signin", UserController.signin);
userRouter.post("/signup", UserController.signup);
userRouter.get("/me", userAuthenticated, UserController.me);

export default userRouter;