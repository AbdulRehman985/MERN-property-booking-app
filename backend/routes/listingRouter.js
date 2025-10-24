import express from "express";
import {
  deleteListing,
  getAllListings,
  listingFindById,
  newListing,
  reviewListings,
  updateListing,
} from "../controllers/listing.js";
import { authitacted, isAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import upload from "../middlewares/multer.js";
import { uploadToCloudinary } from "../middlewares/uploadToCloudinary.js";
const Listingrouter = express.Router();

Listingrouter.route("/")
  .get(getAllListings) // GET /api/listings
  .post(
    upload.single("image"),
    uploadToCloudinary,
    authitacted,
    isAdmin,
    newListing
  ); // POST /api/listings

Listingrouter.route("/:id")
  .get(authitacted, listingFindById) // GET /api/listings/:id
  .put(
    upload.single("image"),
    uploadToCloudinary,
    authitacted,
    isAdmin,
    updateListing
  ) // PUT /api/listings/:id
  .delete(authitacted, isAdmin, deleteListing); // DELETE /api/listings/:id
Listingrouter.route("/:id/review").post(authitacted, checkId, reviewListings);
export default Listingrouter;
