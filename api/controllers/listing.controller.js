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

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json({
      listings,
    });
  } catch (error) {
    next(error);
  }
};
