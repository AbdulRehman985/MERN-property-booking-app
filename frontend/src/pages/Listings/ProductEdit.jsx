import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditListByIDMutation,
  useGetListByIDQuery,
} from "../../redux/api/listingsSlice";
import LoaderComponent from "../../components/LoaderComponent";
import { toast } from "react-toastify";

const ProductEdit = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetListByIDQuery(id);
  const [productEdit] = useEditListByIDMutation();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setDescription(product.description || "");
      setImage(product.image || "");
      setLocation(product.location || "");
      setCountry(product.country || "");
      setPrice(product.price || "");
    }
  }, [product]);
  if (isLoading) return <LoaderComponent />;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load product details.
      </div>
    );
  const editHandler = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const updatedProduct = await productEdit({
        id: product._id,
        data: { image, price, title, description, country, location },
      }).unwrap();

      toast.success(`${updatedProduct.title} has been updated.`);
      navigate(`/listings/${updatedProduct._id}`);
    } catch (err) {
      console.error(err.data.message);
      toast.error(err.data.message || "Product update failed. Try again.");
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div>
      <form onSubmit={editHandler}>
        <input
          type="text"
          name="title"
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
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <br />
        <input
          type="number"
          value={price}
          id=""
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">{isUpdating ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
};

export default ProductEdit;
