import React, { useEffect } from "react";

function Subscribe() {
  useEffect(() => {
    // Only load the script if it's not already loaded
    if (
      !document.querySelector(
        'script[src="https://static.everyaction.com/ea-actiontag/at.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://static.everyaction.com/ea-actiontag/at.js";
      script.crossOrigin = "anonymous";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="bg-[#F0F3FF] text-[#231F21] px-6 py-12">
      <div className="max-w-6xl mx-2 sm:mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
        {/* Left Side Content */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold md:text-5xl font-bold mb-6 leading-tight">
            Sign up for the Unrig Our Economy email list.
          </h2>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 w-full max-w-md">
          {/* Original form with CORS issue */}
          {/* <div
            className="ngp-form"
            data-form-url="https://secure.everyaction.com/v1/Forms/VclP0zEJRkOLk5uvhfgaAw2"
            data-fastaction-endpoint="https://fastaction.ngpvan.com"
            data-inline-errors="true"
            data-fastaction-nologin="true"
            data-databag-endpoint="https://profile.ngpvan.com"
            data-databag="everybody"
            data-mobile-autofocus="false"
          ></div> */}

          {/* Tied to submission form script in index.html */}
          <form
            id="my-form"
            action="https://formspree.io/f/xanjvvqp"
            method="POST"
            className="space-y-6 max-w-md w-full"
          >
            <div className="flex flex-col text-sm text-[#5b6671] cursor-pointer font-normal leading-6">
              <label htmlFor="firstName" className="mb-1">
                FIRST NAME
              </label>
              <input
                type="text"
                name="message"
                id="firstName"
                className="bg-transparent border-b border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col text-sm text-[#5b6671] cursor-pointer font-normal leading-6">
              <label htmlFor="email" className="mb-1 text-sm">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-transparent border-b border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              id="my-form-button"
              className={`inline-block w-[131px] h-[40px] min-w-full text-center leading-[40px] uppercase transition-transform duration-200 hover:scale-105 font-semibold bg-black text-white text-sm border shadow border-black`}
              style={{
                boxShadow: "-4px 4px 0 0 black",
              }}
            >
              Submit
            </button>

            <p id="my-form-status" className="text-sm text-gray-500"></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
