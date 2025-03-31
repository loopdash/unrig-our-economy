import React from 'react';
import { Link } from 'react-router-dom';
import stateGroup from "../assets/stateGroup.png";

function SearchAnotherState() {
  return (
    <div className="bg-black rounded-3xl px-6 py-10 text-white max-w-5xl mx-auto mt-10 mb-10">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Text Content */}
        <div className="md:w-[80%] w-full">
          <p className="text-sm text-[#E8EA58] font-semibold uppercase tracking-wider mb-4">
            Unrig our economy
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Search another state to compare state data.
          </h2>
          <p className="text-base text-white/90 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget gravida leo.
            Mauris nec massa volutpat lacus egestas fringilla ac vitae lacus. Nullam ut sagittis nisl.
            Sed convallis molestie ultricies.{' '}
            <Link to="/search-by-state" className="underline">
              See data in my state.
            </Link>
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-start">
          <img src={stateGroup} alt="State Group Illustration" className="flex justify-start" />
        </div>
      </div>
    </div>
  );
}

export default SearchAnotherState;
