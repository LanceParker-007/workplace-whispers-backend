import { Router } from "express";
import { signInWithGoogle } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/sign-in-with-google", signInWithGoogle);

export default authRouter;
