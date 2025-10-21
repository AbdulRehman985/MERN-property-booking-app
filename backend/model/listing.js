import mongoose, { Types } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    user: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: {
      filename: { type: String, default: "listingimage" },
      url: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
        required: true,
      },
    },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true },
    country: { type: String, required: true },
    reviews: [reviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
    averageRating: { type: Number, default: 0 },
    owner: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
