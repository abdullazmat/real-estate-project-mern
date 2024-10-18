import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../Utils/verifyUser.js";

const UserRouter = express.Router();

// Define your routes
UserRouter.get("/test", test);
UserRouter.post("/update/:id", verifyToken, updateUser);

// Export the router
export default UserRouter;
