import React from 'react';
import stateGroup from "../assets/stateGroup.png";

function SearchAnotherState() {
  return (

    
    <div className="bg-[#231F21] rounded-3xl px-6 py-10 text-white max-w-6xl mx-auto mt-10 mb-10">


      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Text Content */}
        <div className="md:w-[80%] w-full px-6">
        <p className="text-md font-semibold uppercase tracking-wider mb-4 text-[#E8EA58] max-w-[70%]">
        Unrig our economy
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] font-bold mb-6 leading-tight text-white">
          Search another state to compare state data.
          </h2>
          <p className="mb-4 font-normal text-lg tracking-[0] pb-4 text-white max-w-[90%]">
          It’s time to act. The rising costs of everyday goods aren’t just a nuisance—they’re a reflection of a rigged economy that puts profits over people.{' '}
            <a href="#search" className="underline underline-offset-4">
              Search again.
            </a>
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-start px-6">
          <img src={stateGroup} alt="State Group Illustration" className="flex justify-start" />
        </div>
      </div>
    </div>
  );
}

export default SearchAnotherState;
