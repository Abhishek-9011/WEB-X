import React, { useState } from "react";

function RatingCard({ imageSrc, location, reviews, street, openingTime }) {
  const [rating, setRating] = useState(0); // Rating state
  const [hover, setHover] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false); // Heart toggle state

  return (
    <div className="mb-4 bg-[#1d1b21] p-3 rounded-xl text-white">
      {/* Image */}
      <img src={imageSrc} alt={location} className="w-full rounded-lg mb-2" />
      <div className="flex justify-between items-center">
        {/* Rating Stars */}
        <div className="flex justify-center items-center mt-2 ">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <span
                key={index}
                className={`cursor-pointer text-xl ${
                  ratingValue <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-400"
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
        <div>
          <img
            className="w-[20px] mt-2.5 h-[20px] cursor-pointer"
            src={isFavorite ? "/heart2.png" : "/heart.png"} // Toggle image source
            alt="Favorite"
            onClick={() => setIsFavorite(!isFavorite)}
          />
        </div>
      </div>
      {/* Location Name */}
      <p className="font-bold ">{location}</p>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center ">
          <div>
            <img
              className="w-[20px] h-[20px] "
              src="/location.png"
              alt="Location"
            />
          </div>
          <div>
            <p> {street}</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-1">
          <div>
            <img className="w-[20px] h-[20px]" src="/clock.png" alt="Clock" />
          </div>
          <div>
            <p> Opens at {openingTime}</p>
          </div>
        </div>
      </div>
      <hr className="my-2 border-gray-600" />
      <div>{reviews} reviews</div>
    </div>
  );
}

export default RatingCard;
