import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { insertData } from "./init/insert.js";
import Listingrouter from "./routes/listingRouter.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/UserRouter.js";
import Listing from "./model/listing.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const addOwnerProperty = async () => {
  try {
    await Listing.updateMany({}, { $set: { owner: "" } });
    console.log("ADDED");
  } catch (error) {
    console.log(error);
  }
};
// Connect Database
connectDB();
// addOwnerProperty();
app.use("/api/listings", Listingrouter);
app.use("/api/users", userRouter);
// insertData();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
