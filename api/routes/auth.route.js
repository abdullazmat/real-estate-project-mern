import express from "express";
import {
  google,
  signin,
  signup,
  signOut,
} from "../controllers/auth.controller.js";

const Authrouter = express.Router();

Authrouter.post("/signup", signup);
Authrouter.post("/sign-in", signin);
Authrouter.post("/google", google);
Authrouter.get("/signOut", signOut);

export default Authrouter;
