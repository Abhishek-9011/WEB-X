import React, { useState } from "react";
import RatingCard from "./RatingCard";

function MapSidebar({ reviews }) {
  const [isOpen, setIsOpen] = useState(true); // Sidebar state

  return (
    <div className="flex mt-[5px] gap-1">
      {/* Toggle Button */}
      <div
        className="rounded-full w-[50px] h-[50px] bg-black text-center text-white flex justify-center items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // Toggle sidebar state
      >
        <img
          src={isOpen ? "/closing.png" : "/opening.png"} // Toggle icons
          alt="Toggle Sidebar"
          className="w-6 h-6"
        />
      </div>

      {/* Sidebar */}
      <div
        className={`bg-[#0e0e11] p-4 rounded-3xl text-white transition-all duration-300 ease-in-out ${
          isOpen ? "w-80 opacity-100" : "w-0 overflow-hidden opacity-0"
        }`}
      >
        {/* Search Input with Icon */}
        <div className="mb-4 h-[70px] flex flex-col justify-center rounded-3xl items-center bg-[#1d1b21]">
          <div className="relative w-full">
            {/* Search Icon */}
            <div className="absolute left-0 top-0 h-full w-10 bg-black flex justify-center items-center rounded-full">
              <img src="/search.png" alt="Search Icon" className="h-5 w-5" />
            </div>

            {/* Search Input */}
            <input
              className="w-full p-2 pl-12 rounded-full bg-[#29262a] text-white placeholder-gray-300 focus:outline-none h-10"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Rating Cards */}
        <RatingCard imageSrc="/museum.jpeg" location="Royal Ontario Museum" reviews={150} street={'Queen Park'} openingTime={"8 AM"} />
        <RatingCard imageSrc="/museum.jpeg" location="Royal Ontario Museum" reviews={150} street={'Queen Park'} openingTime={"8 AM"} />
        <RatingCard imageSrc="/museum.jpeg" location="Royal Ontario Museum" reviews={150} street={'Queen Park'} openingTime={"8 AM"} />
      
      </div>
    </div>
  );
}

export default MapSidebar;
