import React, { useEffect, useState } from "react";

function HeaderCTA({ state, percentage }) {
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    if (percentage > 0) {
      setDirection("up");
    } else {
      setDirection("down");
    }
  }, [state, percentage]); // ✅ Added dependencies inside `useEffect`

  return (
    <div className="w-full h-[347px] gap-[10px] pt-[50px] pr-[100px] pb-[50px] pl-[100px]">
      <h1 className="font-barlow font-semibold text-[75px] leading-[103%] tracking-[0%]">
        The price of 🥚 eggs in {state} has gone {direction} {Math.abs(percentage)}% over the last month.
      </h1>
      <section className="flex flex-row space-x-2">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, end of first sentence. </p>
        <a href="#" className="text-blue-500 underline">How did we arrive at this number?</a>
      </section>
    </div>
  );
}

export default HeaderCTA;
