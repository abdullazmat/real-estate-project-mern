import express from "express";
import { google, signin, signup } from "../controllers/auth.controller.js";

const Authrouter = express.Router();

Authrouter.post("/signup", signup);
Authrouter.post("/sign-in", signin);
Authrouter.post("/google", google);

export default Authrouter;
