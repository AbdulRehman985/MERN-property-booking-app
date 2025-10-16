import React from "react";
import { useGetAllListingQuery } from "../../redux/api/listingsSlice";
import CardProduct from "./CardProduct";

import LoaderComponent from "../../components/LoaderComponent";

const AllProducts = () => {
  const { data: products, isLoading, error } = useGetAllListingQuery();
  if (isLoading) return <LoaderComponent isLoading={isLoading} />;

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading listings.
      </div>
    );

  if (!products?.length)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        No listings found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <h1 className="text-2xl font-bold text-white mb-6">All Listings</h1>
      <CardProduct products={products} />
    </div>
  );
};

export default AllProducts;
