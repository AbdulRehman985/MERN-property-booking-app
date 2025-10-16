import Listing from "../model/listing.js";
import { data } from "./data.js";

export const insertData = async () => {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(data);
  } catch (error) {
    console.log(error?.message || error);
  }
};
