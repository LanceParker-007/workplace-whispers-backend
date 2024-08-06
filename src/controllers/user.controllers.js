import expressAsyncHandler from "express-async-handler";
import User from "../models/user.models.js";

export const checkUsername = expressAsyncHandler(async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    res.status(200).json({ message: "Username is available" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  const { username } = req.body;
});
