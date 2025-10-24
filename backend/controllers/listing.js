import Listing from "../model/listing.js";

export const getAllListings = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.status(200).json(allListings);
  } catch (error) {
    console.error("❌ Error fetching listings:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const listingFindById = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error("❌ Error fetching listing by ID:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const newListing = async (req, res) => {
  try {
    const { title, description, price, location, country } = req.body;

    // Validate fields (image is uploaded separately)
    if (!title || !description || !price || !location || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.cloudinaryResult) {
      return res
        .status(400)
        .json({ message: "Image upload failed or missing" });
    }

    console.log("✅ req.body:", req.body);
    console.log("✅ req.cloudinaryResult:", req.cloudinaryResult);

    const newListing = new Listing({
      title,
      description,
      price,
      location,
      country,
      image: {
        url: req.cloudinaryResult.url,
        public_id: req.cloudinaryResult.public_id,
      },
      owner: req.user._id,
    });

    const savedListing = await newListing.save();
    console.log("✅ New listing created:", savedListing);

    res.status(201).json(savedListing);
  } catch (error) {
    console.error("❌ Error creating new listing:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if listing exists
    const existingListing = await Listing.findById(id);
    if (!existingListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const { title, description, price, location, country } = req.body;

    // Validate required fields
    if (!title || !description || !price || !location || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prepare updated data
    const updatedData = {
      title,
      description,
      price,
      location,
      country,
      owner: req.user._id,
    };
    console.log(updatedData);

    // If a new image is uploaded
    if (req.cloudinaryResult) {
      // Optional: delete old image from Cloudinary
      // await cloudinary.uploader.destroy(existingListing.image.public_id);

      updatedData.image = {
        url: req.cloudinaryResult.url,
        public_id: req.cloudinaryResult.public_id,
      };
    }

    // Update listing
    const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedListing);
  } catch (error) {
    console.error("❌ Error updating listing:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({
      message: "Listing deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting listing:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const reviewListings = async (req, res) => {
  try {
    const { comment, rating } = req.body;

    if (!comment || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const alreadyReviewed = listing.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    const review = {
      comment,
      name: req.user.userName,
      rating: Number(rating),
      user: req.user._id,
    };

    listing.reviews.push(review);
    listing.numReviews = listing.reviews.length;

    await listing.save();

    const updatedListing = await Listing.findById(req.params.id);
    res.status(201).json({
      message: "Review added successfully!",
      listing: updatedListing,
    });
  } catch (error) {
    console.error("❌ Error adding review:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
