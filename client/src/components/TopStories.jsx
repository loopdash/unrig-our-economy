import React from "react";
import shopper from "../assets/shopper.png";
import fish from "../assets/fish.png";
import store from "../assets/store.png";
import trump from "../assets/trump.png";
import numbers from "../assets/numbers.png";

const stories = [
  {
    title: "Fact check: Trump lies about the price of eggs, groceries and gas",
    outlet: "CNN",
    date: "04.23.25",
    image: trump,
    link: "https://www.cnn.com/2025/04/23/politics/price-of-eggs-gas-trump-fact-check/index.html",
    subtext: "Gas. Groceries. Eggs. Over the last week, President Donald Trump has lied about the price of all of them — using this repeated deception to try to minimize widespread concerns that his tariffs will fuel inflation.",

  },
  {
    title: "Tariff Concerns Drive Global Food Prices to Two-Year High",
    outlet: "BLOOMBERG",
    date: "05.02.25",
    image: store,
    link: "https://www.bloomberg.com/news/articles/2025-05-02/tariff-uncertainty-drives-global-food-prices-to-two-year-high",
    subtext: "Global food prices rose to a two-year high in April, a sign that tariff uncertainty is starting to put a squeeze on trade. A United Nations index tracking raw commodity costs of food rose to 128.3, a 1% month-on-month jump, taking it levels last seen in March 2023.",
  },
  {
    title:
      "Higher prices are likely for these 10 grocery items when tariffs hit",
    outlet: "NPR",
    date: "04.04.25",
    image: fish,
    link: "https://www.npr.org/2025/04/04/nx-s1-5351324/tariffs-higher-grocery-prices-trump",
    subtext: "A trip to the grocery or liquor store is about to become even more expensive, economists say, following the latest round of import tariffs announced by President Trump on Wednesday.",

  },
  {
    title:
      "Most Americans expect higher prices as a result of Trump’s tariffs, a new AP-NORC poll finds",
    outlet: "AP NEWS",
    date: "04.24.25",
    image: shopper,
    link: "https://apnews.com/article/trump-economy-poll-tariffs-inflation-prices-recession-1d320115e8801e4970bd5cccf2742fc4",
    subtext: "Americans’ trust in President Donald Trump to bolster the U.S. economy appears to be faltering, with a new poll showing that many people fear the country is being steered into a recession and that the president’s broad and haphazardly enforced tariffs will cause prices to rise.",

  },
  {
    title:
      "Nearly two-thirds of Americans disapprove of Trump tariffs, with inflation a broad concern: POLL",
    outlet: "ABC NEWS",
    date: "04.25.25",
    image: numbers,
    link: "https://abcnews.go.com/Politics/thirds-americans-disapprove-trump-tariffs-inflation-broad-concern/story?id=121123815",
    subtext: "Seven in 10 Americans think President Donald Trump's tariffs on international trade will drive up U.S. inflation, outweighing hopes that they'll boost manufacturing employment and fueling a 64% disapproval rate of how he's handling the issue.",

  },
];

export default function TopStories() {
  return (
    <div className="bg-[#eaeefc] rounded-3xl px-16 py-12  text-white max-w-6xl mx-2 sm:mx-auto mt-10 mb-10 ">
      <h2 className="text-md font-bold text-blue-600 uppercase mb-4">
        Top Stories
      </h2>
      <div className="space-y-4git">
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
            {/* <img
              src={story.image}
              alt="story icon"
              className="w-20 h-20 ml-4 text-3xl"
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
