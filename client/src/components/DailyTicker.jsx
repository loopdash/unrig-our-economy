import React from "react";
import { Link } from "react-router-dom";
import searchArrow from "../assets/search-arrow.png";
import directionArrow from "../assets/direction-arrow.png";

function DailyTicker({ texasPrice, californiaPrice, virginiaPrice }) {
  return (
    <div className="w-full h-[74px] gap-[10px] pt-[20px] pr-[100px] pb-[20px] pl-[100px] flex flex-row space-x-6 justify-center items-center" style={{ backgroundColor: "#F0F3FF" }}>
      <p style={{color: "#4D5440"}}>Today</p>

      <div className="flex items-center space-x-1">
        <span>Eggs in Texas ${Number(texasPrice).toFixed(2)}</span>
        <img src={directionArrow} alt="Direction arrow" className="w-4 h-4" />
      </div>

      <div className="flex items-center space-x-1">
        <span>Eggs in California ${Number(californiaPrice).toFixed(2)}</span>
        <img src={directionArrow} alt="Direction arrow" className="w-4 h-4" />
      </div>

      <div className="flex items-center space-x-1">
        <span>Eggs in Virginia ${Number(virginiaPrice).toFixed(2)}</span>
        <img src={directionArrow} alt="Direction arrow" className="w-4 h-4" />
      </div>

      <Link to="/search-by-state" className="flex items-center space-x-1 underline">
        <span>Search by my state</span>
        <img src={searchArrow} alt="Search arrow" className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default DailyTicker;
