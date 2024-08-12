import { Router } from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  handlePostAction,
} from "../controllers/posts.controllers.js";

const postsRouter = Router();

postsRouter.post("/create-new", protect, createPost);
postsRouter.post("/like-dislike", protect, handlePostAction);
postsRouter.post("/get-all", protect, getAllPosts);
postsRouter.post("/delete", protect, deletePost);

export default postsRouter;
