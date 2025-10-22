import { useAddReviewListingMutation } from "../../redux/api/listingsSlice";
import { useState } from "react";


const ReviewProducts = ({ product, id }) => {

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewListing, { isLoading, error }] = useAddReviewListingMutation();

  const reviewHandler = async (e) => {
    e.preventDefault();
    try {
      await reviewListing({ id, comment, rating }).unwrap();
      setComment("");
      setRating(0);
      console.log("✅ Review Added");
    } catch (err) {
      console.error("❌ Review error:", err);
    }
  };

  return (
    <div>
      <form onSubmit={reviewHandler}>
        <input
          type="text"
          name="comment"
          placeholder="Enter Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <input
          type="number"
          name="rating"
          placeholder="Enter Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <br />
        <button type="submit" className="bg-pink-400">
          {isLoading ? "Submitting..." : "Review"}
        </button>
      </form>

      {error && <p className="text-red-500">{error?.data?.message}</p>}

      <div className="text-white">
        {product?.reviews?.map((review) => (
          <div key={review._id}>
            <span>Name: {review?.name}</span>
            <h1>Comment: {review?.comment}</h1>
            <h5>Rating: {review?.rating}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewProducts;
