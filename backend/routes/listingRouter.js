import express from "express";
import {
  deleteListing,
  getAllListings,
  listingFindById,
  newListing,
  updateListing,
} from "../controllers/listing.js";
import { authitacted, isAdmin } from "../middlewares/authMiddleware.js";
const Listingrouter = express.Router();

Listingrouter.route("/")
  .get(getAllListings) // GET /api/listings
  .post(authitacted, isAdmin, newListing); // POST /api/listings

Listingrouter.route("/:id")
  .get(authitacted, listingFindById) // GET /api/listings/:id
  .put(authitacted, isAdmin, updateListing) // PUT /api/listings/:id
  .delete(authitacted, isAdmin, deleteListing); // DELETE /api/listings/:id
export default Listingrouter;
