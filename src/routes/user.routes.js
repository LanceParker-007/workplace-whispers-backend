import { Router } from "express";
import { checkUsername, updateUser } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/check-username", checkUsername);

// TODO: Update User Data
userRouter.put("/update", updateUser);

export default userRouter;
