import React from "react";
import { Link } from "react-router-dom";
import searchArrow from "../assets/search-arrow.png";
import directionArrow from "../assets/direction-arrow.png";

function DailyTicker({ texasPrice, californiaPrice, virginiaPrice }) {
  return (
<div className="w-full px-4 py-4 sm:px-10 md:px-[100px] flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 justify-center items-center bg-[#F5F2F2]">
<p style={{color: "#4D5440"}}>Today</p>

      {texasPrice !== null && (
        <div className="flex items-center space-x-1">
          <span>Eggs in Texas ${Number(texasPrice).toFixed(2)}</span>
          <img src={directionArrow} alt="Direction arrow" className="w-4 h-4" />
        </div>
      )}

      {californiaPrice !== null && (
        <div className="flex items-center space-x-1">
          <span>Eggs in California ${Number(californiaPrice).toFixed(2)}</span>
          <img src={directionArrow} alt="Direction arrow" className="w-4 h-4" />
        </div>
      )}

      {virginiaPrice !== null && (
        <div className="flex items-center space-x-1">
          <span>Eggs in Virginia ${Number(virginiaPrice).toFixed(2)}</span>
          <img src={directionArrow} alt="Direction arrow" className="w-4 h-4" />
        </div>
      )}

      <Link to="/search-by-state" className="flex items-center space-x-1 underline">
        <span>Search by my state</span>
        <img src={searchArrow} alt="Search arrow" className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default DailyTicker;
