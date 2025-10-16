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
    const { title, description, image, price, location, country } = req.body;

    if (!title || !description  || !price || !location || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newListing = new Listing({
      title,
      description,
      image,
      price,
      location,
      country,
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

    // ✅ Check if listing exists
    const existingListing = await Listing.findById(id);
    if (!existingListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    
    // ✅ Update listing
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
      new: true, // return the updated document
      runValidators: true, // ensure schema validation rules are enforced
    });

    res.status(200).json(updatedListing); // ✅ use 200 OK for update
  } catch (error) {
    console.error("❌ Error updating listing:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Try to delete the listing
    const deletedListing = await Listing.findByIdAndDelete(id);

    // ❌ If not found
    if (!deletedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // ✅ Successfully deleted
    res.status(200).json({
      message: "Listing deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting listing:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
