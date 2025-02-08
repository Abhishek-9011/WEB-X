import React, { useState } from "react";
import RatingCard from "./RatingCard";

function MapSidebar({ reviews }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex mt-2 gap-2">
      {/* Sidebar Toggle Button */}
      <div
        className="rounded-full border border-white ml-1 w-[45px] h-[45px] bg-black flex justify-center items-center cursor-pointer shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={isOpen ? "/closing.png" : "/opening.png"}
          alt="Toggle Sidebar"
          className="w-5 h-5"
        />
      </div>

      {/* Sidebar */}
      <div
        className={`bg-[#0e0e11] p-4 rounded-3xl text-white transition-all duration-300 ease-in-out shadow-lg ${
          isOpen ? "w-80 opacity-100" : "w-0 overflow-hidden opacity-0"
        }`}
      >
        {/* Search Bar */}
        <div className="mb-4 p-3 flex flex-col justify-center rounded-3xl bg-[#1c1b20] shadow-md">
          <div className="relative w-full">
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-black flex justify-center items-center rounded-full">
              <img src="/search.png" alt="Search Icon" className="h-5 w-5" />
            </div>
            <input
              className="w-full p-2 pl-12 rounded-full bg-[#29262a] text-white placeholder-white focus:outline-none h-10"
              type="text"
              placeholder="Search"
            />
          </div>
          <hr className="my-3 bg-[#1c1b20] border-gray-600" />
          <div className="flex  gap-3 items-center w-full">
            <img src="/toronto.webp" alt="Toronto" className="w-14 h-14 rounded-lg object-cover" />
            <div className="flex flex-col min-w-[200px]">
              <h3 className="text-lg font-semibold">Toronto</h3>
              <p className="text-sm text-gray-400">43°42'0.4" N, 79°24'58.68" W</p>
            </div>
          </div>
        </div>
        {/* Rating Cards */}
        <div className="space-y-4">
          <RatingCard imageSrc="/museum.jpeg" location="Royal Ontario Museum" reviews={149} street="100 Queen's Park" openingTime="8 AM" />
        </div>
      </div>
    </div>
  );
}

export default MapSidebar;
