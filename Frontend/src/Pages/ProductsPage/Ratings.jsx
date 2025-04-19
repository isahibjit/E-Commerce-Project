
import React, { useEffect, useState } from "react";

const Ratings = ({ avgRating }) => {

  const [rating, setRating] = useState(1);
  useEffect(() => {
    if (avgRating) {
      setRating(Math.round(avgRating));
    }
  }, [avgRating]);

  return (
    <div className="flex space-x-2">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          className={`text-3xl ${
            index < rating ? "text-yellow-500" : "text-gray-400"
          } focus:outline-none`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default Ratings;
