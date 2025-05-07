import React from "react";
import shopper from "../assets/shopper.png";
import fish from "../assets/fish.png";
import store from "../assets/store.png";
import trump from "../assets/trump.png";
import numbers from "../assets/numbers.png";

export const stories = [
  {
    title: "Fact check: Trump lies about the price of eggs, groceries and gas",
    outlet: "CNN",
    date: "04.23.25",
    image: trump,
    link: "https://www.cnn.com/2025/04/23/politics/price-of-eggs-gas-trump-fact-check/index.html",
    subtext: "Lorium Ipsum Lorem Ipsum",

  },
  {
    title: "Tariff Concerns Drive Global Food Prices to Two-Year High",
    outlet: "BLOOMBERG",
    date: "05.02.25",
    image: store,
    link: "https://www.bloomberg.com/news/articles/2025-05-02/tariff-uncertainty-drives-global-food-prices-to-two-year-high",
    subtext: "Lorium Ipsum Lorem Ipsum",
  },
  {
    title:
      "Higher prices are likely for these 10 grocery items when tariffs hit",
    outlet: "NPR",
    date: "04.04.25",
    image: fish,
    link: "https://www.npr.org/2025/04/04/nx-s1-5351324/tariffs-higher-grocery-prices-trump",
    subtext: "Lorium Ipsum Lorem Ipsum",

  },
  {
    title:
      "Most Americans expect higher prices as a result of Trump’s tariffs, a new AP-NORC poll finds",
    outlet: "AP NEWS",
    date: "04.24.25",
    image: shopper,
    link: "https://apnews.com/article/trump-economy-poll-tariffs-inflation-prices-recession-1d320115e8801e4970bd5cccf2742fc4",
    subtext: "Lorium Ipsum Lorem Ipsum",

  },
  {
    title:
      "Nearly two-thirds of Americans disapprove of Trump tariffs, with inflation a broad concern: POLL",
    outlet: "ABC NEWS",
    date: "04.25.25",
    image: numbers,
    link: "https://abcnews.go.com/Politics/thirds-americans-disapprove-trump-tariffs-inflation-broad-concern/story?id=121123815",
    subtext: "Lorium Ipsum Lorem Ipsum",

  },
];

export default function TopStories() {
  return (
    <div className="bg-[#eaeefc] rounded-3xl px-16 py-12  text-white max-w-6xl mx-2 sm:mx-auto mt-10 mb-10 ">
      <h2 className="text-md font-bold text-blue-600 uppercase mb-4">
        Top Stories
      </h2>
      <div className="space-y-6">
        {stories.map((story, index) => (
          <div key={index} className="flex items-start justify-between">
            <div className="flex-1">
              <a href={story.link} target="_blank" rel="noopener noreferrer">
                <p className="text-2xl font-bold text-[#231F21] mb-1 leading-snug">
                  {story.title}
                </p>
              </a>
              <p className="text-sm font-bold text-[#6c757d] tracking-wide text-[#4D5440]">
                {story.outlet}{" "}
                <span className="ml-2 font-medium">{story.date}</span>
              </p>
            </div>
            <img
              src={story.image}
              alt="story icon"
              className="w-20 h-20 ml-4 text-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
