import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import UserRouter from "./routes/user.route.js";
import Authrouter from "./routes/auth.route.js";
import ListingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config(); // Load environment variables from .env file

const mongoURI = process.env.MONGO;
if (!mongoURI) {
  console.error("MONGO environment variable is not set");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "https://shaz-mern.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Middleware to use JSON
app.use(express.json());

// Middleware to use cookies
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is running on port 3001");
});

// Route Handling
app.use("/api/user", UserRouter);
app.use("/api/auth", Authrouter);
app.use("/api/listing", ListingRouter);

app.get("/api", (req, res) => {
  res.send("API is working");
});

// Middle Ware Error Handling
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});
