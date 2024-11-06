import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../Utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing); /// Create a new listing
router.delete("/delete/:id", verifyToken, deleteListing); // Delete a listing
router.post("/update/:id", verifyToken, updateListing); // Update a listing
router.get("/get/:id", getListing); // Get a listing Data

export default router;
