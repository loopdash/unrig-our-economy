import React from "react";
import yolk from "../assets/yolk.png";
import bread from "../assets/bread.png";
import steak from "../assets/beef-steak.png";
import coffee from "../assets/coffee.png";

const stories = [
  {
    title: "The Real Reason Prices Are Rising",
    outlet: "OUTLET",
    date: "Everyday costs are climbing, and working families are feeling the squeeze. But why? The answer lies in government policies that put corporate profits first—through tariffs that drive prices up and tax breaks that benefit big corporations instead of everyday Americans.",
    image: yolk,
  },
  {
    title:
      "Tariffs That Raise Prices on Families",
    outlet: "OUTLET",
    date: "Tariffs are taxes on imported goods, and when they go up, so do the prices we pay at the store. These government-imposed costs disrupt supply chains, make production more expensive, and leave American consumers footing the bill. Instead of addressing inflation, policies like trade wars and tariffs on essential goods only make it harder for working families to make ends meet.",
    image: steak,
  },
  {
    title:
      "Tax Breaks for Big Corporations, Not You",
    outlet: "OUTLET",
    date: "At the same time, instead of working to lower everyday costs, Republicans are prioritizing tax breaks for massive corporations—including the very companies that are hiking prices on consumers. While working families struggle with the rising cost of food, gas, and rent, these corporations are pocketing billions in profits—thanks to tax policies designed to benefit the wealthy.",
    image: bread,
  },
  {
    title:
      "A Better Path Forward",
    outlet: "OUTLET",
    date: "Instead of tax giveaways for the biggest corporations and tariffs that make essentials more expensive, we need policies that lower costs for families—by addressing corporate price gouging, strengthening supply chains, and ensuring the tax system works for everyone, not just the rich.",
    image: coffee,
  },
];

export default function TopStories() {
  return (
    <div className="bg-[#eaeefc] rounded-3xl px-6 py-12 text-white max-w-6xl mx-2 sm:mx-auto mt-10 mb-10 ">
      <h2 className="text-sm font-semibold text-blue-600 uppercase mb-4">
        How Tariffs and Tax Breaks Drive Prices Higher
      </h2>
      <div className="space-y-6">
        {stories.map((story, index) => (
          <div key={index} className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-lg font-bold text-black mb-1 leading-snug">
                {story.title}
              </p>
              {/* <p className="text-sm font-semibold text-[#6c757d] tracking-wide">
                {story.outlet} <span className="ml-2">{story.date}</span>
              </p> */}
              <p className="text-sm font-semibold text-[#6c757d] tracking-wide">
                {story.date}
              </p>
            </div>
            <img src={story.image} alt="story icon" className="w-20 h-20 ml-4 text-3xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
