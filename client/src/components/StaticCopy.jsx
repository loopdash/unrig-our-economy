import React from 'react'

function StaticCopy() {
  return (
    <section className="flex flex-col items-center space-y-4 max-w-6xl justify-center mx-2 sm:mx-auto">
    <div
      className="flex flex-col items-start justify-center rounded-[38px] w-full bg-[#f6f8ff] rounded-xl shadow-lg p-12 space-y-3 min-h-fit rounded-3xl text-white mx-auto max-h-xl min-h-xl leading-tight"
      style={{ backgroundColor: "#E8EA58" }}
    >
      <p className="text-md font-bold uppercase tracking-wider mb-4 text-[#231F21] max-w-[70%]">
      IT’s A FACT!
      </p>
      <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight text-[#231F21]">
      Lorem ipsum dolor sit <span className="bg-[#F16941] text-white font-semibold px-2">over 20%</span> year over year.
      </h2>
      <p className="mb-4 pb-4 font-normal text-[32px] leading-tight font-barlow text-black">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas dui et ligula tincidunt, ac molestie arcu condimentum. 
      </p>
    </div>
  </section>
  )
}

export default StaticCopy
