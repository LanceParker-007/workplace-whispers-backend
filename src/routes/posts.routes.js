import { Router } from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  createPost,
  getAllPosts,
  handlePostAction,
} from "../controllers/posts.controllers.js";

const postsRouter = Router();

postsRouter.post("/create-new", protect, createPost);
postsRouter.post("/like-dislike-action", protect, handlePostAction);
postsRouter.post("/get-all-posts", protect, getAllPosts);

export default postsRouter;
