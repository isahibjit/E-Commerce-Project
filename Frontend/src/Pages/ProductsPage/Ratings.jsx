import React, { useState } from "react";

const Ratings = () => {
  const [rating, setRating] = useState(1);

  const handleRating = (index) => {
    setRating(prevRating=>prevRating+index);
    console.log("I got clicked")
  };
  console.log(rating)
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