import express from "express";
import {
  deleteListing,
  getAllListings,
  listingFindById,
  newListing,
  updateListing,
} from "../controllers/listing.js";
const Listingrouter = express.Router();

Listingrouter.route("/")
  .get(getAllListings) // GET /api/listings
  .post(newListing); // POST /api/listings

Listingrouter.route("/:id")
  .get(listingFindById) // GET /api/listings/:id
  .put(updateListing) // PUT /api/listings/:id
  .delete(deleteListing); // DELETE /api/listings/:id
export default Listingrouter;
