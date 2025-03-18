import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DailyTicker({  }) {
//   const [direction, setDirection] = useState("up");

//   useEffect(() => {
//     if (percentage > 0) {
//       setDirection("up");
//     } else {
//       setDirection("down");
//     }
//   }, [state, percentage]); // ✅ Added dependencies inside `useEffect`

  return (
    <div className="w-full h-[74px] gap-[10px] pt-[20px] pr-[100px] pb-[20px] pl-[100px] flex flex-row space-x-2 justify-center" style={{ backgroundColor: "#F0F3FF" }}>
        <p>Today</p>
        <p>Eggs in Texas</p>
        <p>Eggs in California</p>
        <p>Eggs in New York</p>
        <p>Eggs in California</p>
        <Link to="/search-by-state">Search by my state ➡️</Link>
    </div>
  );
}

export default DailyTicker;
