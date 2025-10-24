import Listing from "../model/listing.js";
import { data } from "./data.js";
import mongoose from "mongoose";

export const insertData = async () => {
  try {
    // ✅ This should be an existing user ID from your DB (admin or test user)
    const defaultOwnerId = new mongoose.Types.ObjectId(
      "68f7f09bcaaf6ff95816c2e7"
    );

    // ✅ Add owner field to each document
    const dataWithOwner = data.map((item) => ({
      ...item,
      owner: defaultOwnerId,
    }));

    await Listing.deleteMany({});
    await Listing.insertMany(dataWithOwner);

    console.log("✅ Data inserted successfully!");
  } catch (error) {
    console.log("❌ Error inserting data:", error.message || error);
  }
};
