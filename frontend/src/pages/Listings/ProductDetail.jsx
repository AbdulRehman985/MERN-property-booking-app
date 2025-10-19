import React from "react";
import {
  useDeleteListByIDMutation,
  useGetListByIDQuery,
} from "../../redux/api/listingsSlice";
import { useNavigate, useParams } from "react-router-dom";
import LoaderComponent from "../../components/LoaderComponent";
import { toast } from "react-toastify";
const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetListByIDQuery(id);
  console.log(product)
  const [deleteListByID] = useDeleteListByIDMutation();
  const navigate = useNavigate();
  if (isLoading) return <LoaderComponent isLoading />;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load product details.
      </div>
    );

  const editHandler = (e) => {
    e.preventDefault();
    navigate(`/listings/${product._id}/edit`);
  };
  const DeleteHandler = async (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
      try {
        await deleteListByID(product?._id);
        toast.success("Listing deleted successfully!");
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete listing");
      }
    }
  };
  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Product not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:flex-row items-center justify-center gap-8 p-6">
      <img
        src={product?.image?.url || "/placeholder.jpg"}
        alt={product?.title}
        className="w-full md:w-1/3 h-80 object-cover rounded-2xl shadow-lg"
      />
      <div className="md:w-2/3 space-y-4">
        <h1 className="text-3xl font-bold text-pink-500">{product?.title}</h1>
        <p className="text-gray-400">{product?.description}</p>

        <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
          <span className="bg-gray-800 px-3 py-1 rounded-full">
            📍 {product?.location || "Unknown location"} {"   "}
            {product?.country}
          </span>
          <span className="bg-gray-800 px-3 py-1 rounded-full">
            🕓 {new Date(product?.createdAt).toLocaleDateString()}
          </span>
        </div>

        <p className="text-xl font-semibold text-green-400 mt-4">
          ${product?.price}
        </p>

        <div className="mt-25 flex justify-between">
          {" "}
          <button
            className="bg-green-500 px-2 py-1 rounded font-semibold text-lg cursor-pointer"
            onClick={editHandler}
          >
            Edit
          </button>
          <button
            className="bg-red-500 px-2 py-1 rounded font-semibold text-lg cursor-pointer"
            onClick={DeleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
