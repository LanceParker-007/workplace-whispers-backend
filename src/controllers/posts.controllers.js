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

export const handlePostAction = expressAsyncHandler(async (req, res) => {
  try {
    const { postId, userAction } = req.body;

    if (!postId || userAction === undefined) {
      res.status(400);
      throw new Error("Post ID and user action are required");
    }

    const post = await Post.findById(postId);

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    const userId = req.user.id;

    // Remove user from likes and dislikes arrays
    post.likes = post.likes.filter(
      (like) => like.toString() !== userId.toString()
    );
    post.dislikes = post.dislikes.filter(
      (dislike) => dislike.toString() !== userId.toString()
    );

    // Add user to the appropriate array based on the action
    if (userAction === "Like") {
      post.likes.push(userId);
    } else if (userAction === "Dislike") {
      post.dislikes.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "Action performed successfully!",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to perform the action!",
      error: error.message,
    });
  }
});

export const getAllPosts = expressAsyncHandler(async (req, res) => {
  try {
    const { userId, page = 1, limit = 10 } = req.body;

    const query = userId ? { user: userId } : {};

    const posts = await Post.find(query)
      .sort({ createdAt: -1 }) // Optional: Sort posts by creation date
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalPosts = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      success: true,
      message: "Fetched all posts successfuly",
      posts,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts!",
      error: error.message,
    });
  }
});
