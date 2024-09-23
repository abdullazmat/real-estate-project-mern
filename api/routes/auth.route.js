import express from "express"
import { signup } from "../controllers/auth.controller.js";

const Authrouter = express.Router();

Authrouter.post("/signup", signup)


export default Authrouter;