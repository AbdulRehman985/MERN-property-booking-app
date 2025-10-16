import React from "react";
import { Link } from "react-router-dom";

const CardProduct = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white">
      {products?.map((product) => (
        <div
          key={product._id}
          className="bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 p-4 flex flex-col justify-between"
        >
          <img
            src={product.image?.url}
            alt={product.title}
            className="w-full h-48 object-cover rounded-lg mb-3"
          />

          <div className="flex flex-col flex-grow">
            <Link to={`/listings/${product._id}`}>
              <h2 className="text-pink-500 font-semibold text-lg hover:underline">
                {product.title}
              </h2>
            </Link>

            <p className="text-gray-400 text-sm mt-1">
              {product.description.length > 80
                ? product.description.slice(0, 80) + "..."
                : product.description}
            </p>
          </div>

          <div className="font-bold mt-3 text-lg text-green-400">
            $ {product.price}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardProduct;
