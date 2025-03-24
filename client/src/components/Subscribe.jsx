import React from 'react'
import Button from './Button'

function Subscribe() {
  return (
    <div className="bg-[#F0F3FF] text-black px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
        
        {/* Left Side Content */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Sign up for the Unrig Our Economy email list.
          </h2>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 flex flex-col items-start gap-4 w-full max-w-md">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <input
              type="text"
              placeholder="First name"
              className="flex-1 border border-gray-300 px-4 py-2 rounded bg-transparent border-b border-black border-t-0 border-l-0 border-r-0 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last name"
              className="flex-1 border border-gray-300 px-4 py-2 rounded bg-transparent border-b border-black border-t-0 border-l-0 border-r-0 focus:outline-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <input
              type="text"
              placeholder="US ZIP Code"
              className="flex-1 border border-gray-300 px-4 py-2 rounded bg-transparent border-b border-black border-t-0 border-l-0 border-r-0 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 border border-gray-300 px-4 py-2 rounded bg-transparent border-b border-black border-t-0 border-l-0 border-r-0 focus:outline-none"
            />
          </div>
          <Button href="/" text="Subscribe" color="black" bgColor="black" />
        </div>
        
      </div>
    </div>
  )
}

export default Subscribe
