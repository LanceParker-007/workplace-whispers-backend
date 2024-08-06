import { Router } from "express";
import protect from "../middlewares/auth.middleware.js";
import { createPost } from "../controllers/posts.controllers.js";

const postsRouter = Router();

postsRouter.post("/create-new", protect, createPost);

export default postsRouter;
