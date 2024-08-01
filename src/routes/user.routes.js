import { Router } from "express";
import { checkUsername } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/check-username", checkUsername);

export default userRouter;
