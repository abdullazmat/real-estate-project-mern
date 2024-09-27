import express from "express"
import { signin, signup } from "../controllers/auth.controller.js";

const Authrouter = express.Router();

Authrouter.post("/signup", signup)
Authrouter.post("/sign-in", signin)


export default Authrouter;