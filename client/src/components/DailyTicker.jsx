import React, { useEffect, useState } from "react";

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
    <div className="w-full h-[74px] gap-[10px] pt-[20px] pr-[100px] pb-[20px] pl-[100px] flex flex-row space-x-2" style={{ backgroundColor: "#F0F3FF" }}>
        <p>Today</p>
        <p>Eggs in Texas</p>
        <p>Eggs in California</p>
        <p>Eggs in New York</p>
        <p>Eggs in California</p>
        <p>Search by my state</p>
    </div>
  );
}

export default DailyTicker;
