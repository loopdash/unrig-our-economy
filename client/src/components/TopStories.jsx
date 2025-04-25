import React from "react";
import yolk from "../assets/yolk.png";
import bread from "../assets/bread.png";
import steak from "../assets/beef-steak.png";
import coffee from "../assets/coffee.png";

const stories = [
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas dui et ligula tincidunt, ac molestie arcu condimentum. Lorem ipsum...",
    outlet: "OUTLET",
    date: "04.27.25",
    image: yolk,
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas dui et ligula tincidunt, ac molestie arcu condimentum. Lorem ipsum...",
    outlet: "OUTLET",
    date: "04.27.25",
    image: steak,
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas dui et ligula tincidunt, ac molestie arcu condimentum. Lorem ipsum...",
    outlet: "OUTLET",
    date: "04.27.25",
    image: bread,
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas dui et ligula tincidunt, ac molestie arcu condimentum. Lorem ipsum...",
    outlet: "OUTLET",
    date: "04.27.25",
    image: bread,
  },
];

export default function TopStories() {
  return (
    <div className="bg-[#eaeefc] rounded-3xl px-6 py-12 text-white max-w-6xl mx-2 sm:mx-auto mt-10 mb-10 ">
      <h2 className="text-md font-bold text-blue-600 uppercase mb-4">
       Top Stories
      </h2>
      <div className="space-y-6">
        {stories.map((story, index) => (
          <div key={index} className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xl font-bold text-[#231F21] mb-1 leading-snug">
                {story.title}
              </p>
              <p className="text-sm font-bold text-[#6c757d] tracking-wide text-[#4D5440]">
                {story.outlet} <span className="ml-2 font-medium">{story.date}</span>
              </p>
            </div>
            <img src={story.image} alt="story icon" className="w-20 h-20 ml-4 text-3xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
