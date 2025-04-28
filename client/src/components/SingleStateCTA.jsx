import React from "react";
import orangeArrow from "../assets/orange-arrow-2.png";
function SingleStateCTA({ state, percent }) {
  return (
    <div className="bg-[#F16941] rounded-3xl px-6 py-10 text-white max-w-6xl mx-auto mt-10 mb-5">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Text Content */}
        <div className="w-full px-6">
          <div className="flex flex-row justify-between items-center w-full">
            <p className="text-md font-bold uppercase tracking-wider mb-4 text-[#E8EA58]">
              Daily Price Tracker
            </p>
            <img src={orangeArrow} alt="orange-arrow" className="w-16 h-16" />
          </div>

          <h1 className="font-barlow font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[75px] tracking-normal md:leading-tight">
            The price of 🥚 eggs in {state} has gone up {percent}%
          </h1>
          <p className="mt-6 font-normal text-lg tracking-[0] pb-4 text-white max-w-[90%]">
            Subtext goes here
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleStateCTA;
