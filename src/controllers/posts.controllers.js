import expressAsyncHandler from "express-async-handler";
import Post from "../models/post.model.js";

export const createPost = expressAsyncHandler(async (req, res) => {
  try {
    const { title, companyName, companyLocation, content } = req.body;

    if (!title || !companyName || !companyLocation || !content) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const post = new Post({
      title,
      companyName,
      companyLocation,
      content,
      user: req.user.id, // assuming req.user is set by your authentication middleware
    });

    const createdPost = await post.save();

    res.status(201).json({
      success: true,
      message: "Post create successfully!",
      createdPost,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
});
