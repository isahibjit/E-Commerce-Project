import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { set, useForm } from "react-hook-form";
import { UserContext } from "../../../Contexts/UserContext";
import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const Review = ({ productId }) => {
  const { user } = useContext(UserContext);
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsReviewLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/reviews/${productId}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setReviewList(response.data.reviews);
          setIsReviewLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsReviewLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [rating, setRating] = useState(0);

  const handleRating = (index) => {
    setRating(index);
  };

  const onSubmit = async (data) => {
    if (!data.comment || data.rating === 0) {
      toast.info("Please fill in all fields.");
      return;
    }
    try {
      setIsLoading(true);
      data.productId = productId;
      const response = await axios.post(BACKEND_API + "api/reviews", data, {
        withCredentials: true,
      });
      if (response.status === 201) {
        setIsLoading(false);
        toast.success("Review Submitted !");
        setShowForm(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("an error occurred while adding the review", error);
    }
  };

  return (
    <div className="border border-gray-300 p-4 transition-all duration-300 ease-in-out">
      <div className="animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-pink-600">
          Customer Reviews
        </h2>

        {/* Reviews */}
        {!isReviewLoading ? (
          <div className="space-y-4 mb-8">
            {reviewList.map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded shadow">
                <p className="font-semibold text-yellow-500">
                  {"⭐️".repeat(review?.rating)}
                </p>
                <p className="text-sm text-gray-600">"{review?.comment}"</p>
                <p className="text-xs text-right text-gray-500">
                  — {review?.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-32">
            <TailChase size="60" speed="1.75" color="pink" />
          </div>
        )}

        {/* Toggle Form */}
        {!showForm ? (
          Object.keys(user).length !== 0 ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-pink-500 to-red-400 hover:from-pink-600 hover:to-red-500 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all"
            >
              <p>✍️ Want to leave a review?</p>
            </button>
          ) : (
            <a href="/login">
              <button class="p-3 border-none rounded-full bg-[#016DD9] text-white text-[17px] font-medium font-inherit hover:animate-shake">
                You are not logged In
              </button>
            </a>
          )
        ) : (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <p className="border p-2 rounded w-full">{user.name}</p>
              {/* Star Rating */}
              <div className="flex space-x-2">
                {[...Array(5)].map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => {
                      const newRating = index + 1;
                      handleRating(newRating);
                      setValue("rating", newRating);
                    }}
                    className={`text-3xl transition-all ${
                      index < rating
                        ? "text-yellow-500 scale-110"
                        : "text-gray-400"
                    } focus:outline-none`}
                  >
                    ★
                  </button>
                ))}
                <input
                  type="hidden"
                  {...register("rating", { required: true })}
                />
              </div>
              <textarea
                {...register("comment", { required: true })}
                rows="3"
                placeholder="Write your review..."
                className="border p-2 rounded w-full"
              ></textarea>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-pink-600 flex items-center justify-center hover:bg-pink-700 w-[200px] text-white font-semibold px-4 py-2 rounded"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-8 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    "✅ Submit Review"
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                  }}
                  className="text-sm text-gray-600 hover:underline cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
