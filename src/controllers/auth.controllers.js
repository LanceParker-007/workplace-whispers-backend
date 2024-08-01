import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.models.js";

export const signInWithGoogle = expressAsyncHandler(async (req, res) => {
  try {
    const { email, username, profilePic } = req.body;

    if (!email || !username || !profilePic) {
      res.status(400);
      throw new Error("All fields are required");
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        username,
        profilePic,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    res.status(200).json({
      success: true,
      message: "Sign in successful!",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        gender: user.gender,
        profilePic: user.profilePic,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sign in failed!",
    });
  }
});
