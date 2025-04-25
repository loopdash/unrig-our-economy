import React from "react";
import background from "../assets/background.png";

export default function RisingPricesSection() {
  return (
    <section
      className="px-6 pt-24 pb-24 text-[#231F21] bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Headline + Subtitle */}
        <div className="flex flex-col items-center text-center space-y-4">
        <h1 className=" font-bold mb-6 leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] font-bold mb-6 leading-tight text-[#F0633B] px-12">

            The Real Reason Prices Are Rising
          </h1>
          <p className="text-md sm:text-lg font-medium max-w-3xl text-black">
            Everyday costs are climbing, and working families are feeling the squeeze. But why? The answer
            lies in government policies that put corporate profits first—through tariffs that drive prices up
            and tax breaks that benefit big corporations instead of everyday Americans.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#231F21] shadow-lg p-12 text-left">
            <h3 className="text-4xl font-bold text-[#F44336] mb-2 text-center">
              Tariffs That Raise Prices on Families
            </h3>
            <p className="text-sm text-black text-center">
              Tariffs are taxes on imported goods, and when they go up, so do the prices we pay at the store.
              These government-imposed costs disrupt supply chains, make production more expensive, and leave
              American consumers footing the bill.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#231F21] shadow-lg p-12 text-left">
          <h3 className="text-4xl font-bold text-[#F44336] mb-2 text-center">
          Tax Breaks for Big Corporations, Not You
            </h3>
            <p className="text-sm text-black text-center">              Instead of working to lower everyday costs, Republicans are prioritizing tax breaks for massive
              corporations—including the very companies that are hiking prices on consumers. While working
              families struggle, these corporations are pocketing billions—
              thanks to tax policies designed to benefit the wealthy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
