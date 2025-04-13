import React, { useState } from "react";

const Ratings = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="flex space-x-2">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          onClick={() => handleRating(index)}
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