import React from "react";

function Navbar({ location }) {
  return (
    <div className="flex justify-between items-center w-full h-[50px] bg-[#0e0e11]">
      <div className="flex justify-center items-center gap-3">
        <div className="flex justify-center items-center rounded-full bg-[#292928] ml-4  w-[35px] h-[35px]">
          <img
            className="items-center h-[15px] w-[15px]"
            src="home.png"
            alt=""
          />
        </div>
        <span className="text-gray-700">|</span>
        <div className=" bg-[#29262a] rounded-full px-4 py-1">
          <span className="text-white font-semibold">Trip to {location}</span>
        </div>
      </div>
      <div className="w-[300px] h-[30px]  rounded-3xl bg-[#292928]"></div>
      <div className="flex justify-center items-center gap-3">
        <div className="rounded-full bg-[#292928] w-[35px] h-[35px]  flex justify-center items-center">
          <img className="h-[15px] w-[15px] " src="play.png" alt="" />
        </div>
        <span className="text-gray-700">|</span>
        <div>
          <button className="bg-white font-bold rounded-2xl w-[60px] mr-[10px]">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
