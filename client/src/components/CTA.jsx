import React from 'react'
import { Link } from 'react-router-dom'

function CTA() {
  return (
    <div className="bg-[#F0643C] rounded-3xl px-6 py-10 text-white max-w-6xl mx-2 sm:mx-auto mt-10 mb-10">
      <p className="text-sm font-semibold uppercase tracking-wider mb-4">
        It’s time to unrig our economy
      </p>
      <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      The Cost of Living Under Trump. 
      </h2>
      <p className="text-base text-white/90 max-w-3xl">
      The cost of living for hardworking Americans continues to climb. Eggs, bread, tomatoes, meat, and coffee—some of the most essential items in your grocery cart—have seen dramatic price increases. While families are struggling to make ends meet, corporations are reaping the rewards. This page breaks down how these prices have changed under the Trump administration and what policies have contributed to the rising costs.
      </p>
      <Link to="/search-by-state" className="underline">
          See data in my state.
        </Link>
    </div>
  )
}

export default CTA
