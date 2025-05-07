import React from "react";

function StaticCopy({ eyebrow, header, subtext, bg, color, href }) {
  return (
    <section className="flex flex-col items-center space-y-4 max-w-6xl justify-center mx-2 sm:mx-auto">
      <div
        className="flex flex-col items-start justify-center rounded-[24px] w-full bg-[#f6f8ff]  shadow-lg p-12 space-y-3 min-h-fit rounded-3xl text-white mx-auto max-h-xl min-h-xl leading-tight"
        style={{ backgroundColor: bg, color: color || "#231F21" }}
      >
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            <p className="text-md font-bold uppercase tracking-wider mb-4 ">
              {eyebrow}
            </p>
          </a>
        ) : (
          <p className="text-md font-bold uppercase tracking-wider mb-4 ">
            {eyebrow}
          </p>
        )}

        <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight ">
          {header}
        </h2>
        <p className="mb-4 pb-4 font-normal text-[32px] leading-tight font-barlow ">
          {subtext}
        </p>
      </div>
    </section>
  );
}

export default StaticCopy;
