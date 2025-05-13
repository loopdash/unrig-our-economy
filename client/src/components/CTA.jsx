import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

function CTA() {
  return (
    <div className="bg-[#F0643C] rounded-3xl p-12 text-white max-w-6xl mx-2 sm:mx-auto mt-10 mb-10">
      <p className="text-md font-bold uppercase tracking-wider mb-4 text-white max-w-[70%]">
        It’s time to unrig our economy
      </p>
      <h2 className=" font-bold mb-6 leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-[5rem]">
        The Cost of Living Under Trump.
      </h2>
      <p className="text-base text-white/90 max-w-3xl">
        Since President Trump took office, the cost of everyday essentials has
        risen. What used to be affordable has now become a financial burden for
        many families. This site dives into how these price increases can affect
        your life, focusing on the impact of key goods like eggs, meat, and
        coffee. We’ll show you who’s responsible for these rising prices and how
        these costs are taking a bigger bite out of Americans’ paychecks.
      </p>

      <a
        href={"/search-by-state-fred"}
        className={`underline underline-offset-4`}
      >
        See data in my state.
      </a>
    </div>
  );
}

export default CTA;
