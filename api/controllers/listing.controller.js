import Listing from "../models/listing.model.js";
import { errorHandler } from "../Utils/error.js";
import mongoose from "mongoose";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json({
      success: true,
      listing,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  } else {
    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "You can only delete your own listings"));
    } else {
      try {
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json("Listing has been deleted");
      } catch (error) {
        next(error);
      }
    }
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  } else {
    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "You can only update your own listings"));
    } else {
      try {
        const updatedListing = await Listing.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
        return res.status(200).json("Listing has been updated");
      } catch (error) {
        next(error);
      }
    }
  }
};

export const getListing = async (req, res, next) => {
  const listingId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(listingId)) {
    return next(errorHandler(400, "Invalid listing ID"));
  }

  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    } else {
      return res.status(200).json({
        listing,
      });
    }
  } catch (error) {
    next(error);
  }
};
