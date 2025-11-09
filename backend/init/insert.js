import Listing from "../model/listing.js";
import { data } from "./data.js";
import mongoose from "mongoose";

export const insertData = async () => {
  try {
    const defaultOwnerId = new mongoose.Types.ObjectId(".....");

    const dataWithOwner = data.map((item) => ({
      ...item,
      owner: defaultOwnerId,
    }));

    await Listing.deleteMany({});
    await Listing.insertMany(dataWithOwner);

    console.log("Data inserted successfully!");
  } catch (error) {
    console.log("Error inserting data:", error.message || error);
  }
};
