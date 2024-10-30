import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../Utils/error.js";

export const test = (req, res) => {
  res.json({
    message: "Hello WOrld JSon",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account"));
  }

  try {
    // If password is being updated, hash it
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 8);
    }

    // Update the user with new values including avatar
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar, // Add avatar field to be updated
        },
      },
      { new: true } // Return the updated document
    );

    // Exclude the password from the response
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .clearCookie("acces_token")
      .json({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};
