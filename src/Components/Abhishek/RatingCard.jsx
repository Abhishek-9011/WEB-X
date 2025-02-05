import React, { useState } from "react";

function RatingCard({ imageSrc, location, reviews, street, openingTime }) {
  const [rating, setRating] = useState(0); // Rating state
  const [hover, setHover] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false); // Heart toggle state

  return (
    <div className="mb-4 bg-[#1c1a21] p-2 rounded-xl text-white shadow-md">
      {/* Image */}
      <img src={imageSrc} alt={location} className="w-full rounded-lg mb-3" />

      {/* Rating and Favorite */}
      <div className="flex justify-between items-center">
        {/* Rating Stars */}
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <span
                key={index}
                className={`cursor-pointer text-xl ${
                  ratingValue <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-500"
                }`}
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              >
                &#9733; {/* Star icon */}
              </span>
            );
          })}
        </div>

        {/* Heart Icon (Favorite Toggle) */}
        <img
          className="w-6 h-6 cursor-pointer"
          src={isFavorite ? "/heart2.png" : "/heart.png"}
          alt="Favorite"
          onClick={() => setIsFavorite(!isFavorite)}
        />
      </div>

      {/* Location Name */}
      <p className="font-bold text-lg mt-2">{location}</p>

      {/* Location and Opening Time */}
      <div className="flex justify-between items-center mt-1 text-sm text-gray-300">
        <div className="flex items-center gap-1">
          <img className="w-4 h-4" src="/location.png" alt="Location" />
          <p>{street}</p>
        </div>
        <div className="flex items-center gap-1">
          <img className="w-4 h-4" src="/clock.png" alt="Clock" />
          <p>Opens at {123}</p>
        </div>
      </div>

      <hr className="my-3 border-gray-600" />

      {/* Reviewers Section */}
      <div className="flex items-center">
        <div className="flex -space-x-2">
          <img
            src="/profile1.png"
            alt="User 1"
            className="w-8 h-8 rounded-full border-2 border-[#1d1b21]"
          />
          <img
            src="/profile2.png"
            alt="User 2"
            className="w-8 h-8 rounded-full border-2 border-[#1d1b21]"
          />
          <img
            src="/profile3.png"
            alt="User 3"
            className="w-8 h-8 rounded-full border-2 border-[#1d1b21]"
          />
        </div>
        <p className="ml-3 text-gray-400">{reviews} reviews</p>
      </div>
    </div>
  );
}

export default RatingCard;
