import React from "react";
import { Link } from "react-router-dom";
import searchArrow from "../assets/search-arrow.png";
import directionArrow from "../assets/direction-arrow.png";
import { AnimatedPrice } from "./AnimatedPrice";

function DailyTicker({ texasPrice, californiaPrice, virginiaPrice }) {
  return (
    <div className="w-full px-4 py-4 sm:px-10 md:px-[100px] flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 justify-center items-center bg-black">
      <p style={{ color: "white", fontWeight: 600, fontSize: "x-small" }}>TODAY</p>

      {texasPrice !== null && (
        <div className="flex items-center space-x-1">
          <span className="text-white">
            Eggs in Texas
            <span className="pl-2 text-red-600 font-semibold">$
              <AnimatedPrice end={Number(texasPrice)} />
            </span>
          </span>
          <img src={directionArrow} alt="Direction arrow" className="w-4 h-4" />
        </div>
      )}

      {californiaPrice !== null && (
        <div className="flex items-center space-x-1">
          <span className="text-white">
            Eggs in California
            <span className="pl-2 text-red-600 font-semibold">$
              <AnimatedPrice end={Number(californiaPrice)} />
            </span>
          </span>
          <img src={directionArrow} alt="Direction arrow" className="w-4 h-4" />
        </div>
      )}

      {virginiaPrice !== null && (
        <div className="flex items-center space-x-1">
          <span className="text-white">
            Eggs in Virginia
            <span className="pl-2 text-red-600 font-semibold">$
              <AnimatedPrice end={Number(virginiaPrice)} />
            </span>
          </span>
          <img src={directionArrow} alt="Direction arrow" className="w-4 h-4" />
        </div>
      )}

      <Link to="/search-by-state" className="flex items-center space-x-1 underline underline-offset-4 text-white font-medium">
        <span>Search by my state</span>
        <img src={searchArrow} alt="Search arrow" className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default DailyTicker;
