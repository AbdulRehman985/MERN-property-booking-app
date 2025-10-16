import React, { useState } from "react";
import { useCreateListingMutation } from "../../redux/api/listingsSlice";
import LoaderComponent from "../../components/LoaderComponent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [createListing, { isLoading, error }] = useCreateListingMutation();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  if (isLoading) return <LoaderComponent />;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load product details.
      </div>
    );

  const newHandler = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const newProduct = await createListing({
        title,
        description,
        // image,
        price,
        location,
        country,
      }).unwrap();

      toast.success(`${newProduct.title} has been created.`);
      navigate(`/listings/${newProduct._id}`);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Product creation failed. Try again.");
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div>
      <form onSubmit={newHandler}>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          name="description"
          placeholder="enter discription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="country"
          placeholder="Enter Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <br />
        <input
          type="number"
          value={price}
          placeholder="Enter Price"
          id=""
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">{isUpdating ? "Creating..." : "Create"}</button>
      </form>
    </div>
  );
};

export default NewProduct;
