import React from 'react'
import { Link } from 'react-router-dom'

function CTA() {
  return (
    <div className="bg-[#F0643C] rounded-3xl px-6 py-10 text-white max-w-6xl mx-2 sm:mx-auto mt-10 mb-10">
      <p className="text-sm font-semibold uppercase tracking-wider mb-4">
        It’s time to unrig our economy
      </p>
      <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
        Grocery prices in America<br />
        have been rising over the last<br />
        xx months data point here!
      </h2>
      <p className="text-base text-white/90 max-w-3xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget gravida leo.
        Mauris nec massa volutpat lacus egestas fringilla ac vitae lacus. Nullam ut sagittis nisl.
        Sed convallis molestie ultricies.{' '}
        <Link to="/search-by-state" className="underline">
          See data in my state.
        </Link>
      </p>
    </div>
  )
}

export default CTA
