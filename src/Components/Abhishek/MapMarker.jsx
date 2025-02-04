import React, { useState } from "react";

function MapMarker({ imageSrc, reviews, location }) {
  const [rating, setRating] = useState(0); // State to track the selected rating
  const [hover, setHover] = useState(0); // State to track hover effect

  return (
    <div className="flex gap-3 bg-[#19191a] w-[250px] justify-center items-center rounded-2xl h-[70px]">
      <div>
        <img
          className="h-[50px] w-[50px] rounded-2xl "
          src={imageSrc}
          alt="sdfsd"
        />
      </div>

      <div className="flex flex-col items-center space-x-2 text-white">
        <div className="flex justify-center items-center">
          <p className="mr-[5px]">{reviews} reviews</p>
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
                &#9733;
              </span>
            );
          })}
        </div>
        <p className="font-bold text-white">{location}</p>
      </div>
    </div>
  );
}

export default MapMarker;
