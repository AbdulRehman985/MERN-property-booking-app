import React, { useState } from "react";
import { useCreateListingMutation } from "../../redux/api/listingsSlice";
import LoaderComponent from "../../components/LoaderComponent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [createListing, { isLoading, error }] = useCreateListingMutation();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  const newHandler = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // 🧠 Use FormData for image upload
      const listingData = new FormData();
      listingData.append("title", title);
      listingData.append("description", description);
      listingData.append("price", price);
      listingData.append("location", location);
      listingData.append("country", country);
      listingData.append("image", image); // ✅ must be file object
      for (let pair of listingData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      const newProduct = await createListing(listingData).unwrap();

      toast.success(`${newProduct.title} has been created.`);
      navigate(`/listings/${newProduct._id}`);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      toast.error(err?.data?.message || "Product creation failed. Try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <LoaderComponent />;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load product details.
      </div>
    );

  return (
    <div className="p-4 text-black">
      <form onSubmit={newHandler} className="flex flex-col gap-3 max-w-md mx-auto">
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])} // ✅ Correct way
        />

        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          name="description"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          type="text"
          name="location"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="text"
          name="country"
          placeholder="Enter Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          type="submit"
          className="bg-pink-500 p-2 rounded hover:bg-pink-600 transition"
        >
          {isUpdating ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
