import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserListings,
} from "../controllers/user.controller.js";
import { verifyToken } from "../Utils/verifyUser.js";

const UserRouter = express.Router();

// Define your routes
UserRouter.get("/test", test);
UserRouter.post("/update/:id", verifyToken, updateUser);
UserRouter.delete("/delete/:id", verifyToken, deleteUser);
UserRouter.get("/listings/:id", verifyToken, getUserListings);

// Export the router
export default UserRouter;
