import React, { useEffect, useState } from "react";
import { getProductAverages } from "../services/api";
import ProductAveragesGraph from "../components/ProductAveragesGraph";
import searchArrow from "../assets/search-arrow-2.png";
import SearchAnotherState from "../components/SearchAnotherState";
import Subscribe from "../components/Subscribe";
import SingleFredDataGraph from "../components/SingleFredDataGraph";
import SingleStateCTA from "../components/SingleStateCTA";
import StaticCopy from "../components/StaticCopy";
// ✅ State Abbreviation Mapping
const stateAbbreviations = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

// ✅ Reverse mapping (Full Name -> Abbreviation)
const fullToAbbr = Object.fromEntries(
  Object.entries(stateAbbreviations).map(([abbr, full]) => [
    full.toLowerCase(),
    abbr,
  ])
);

function SearchByStateWithFred() {
  const [productAverages, setProductAverages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [eggPercentChange, setEggPercentChange] = useState(null);

  const [shuffledStories, setShuffledStories] = useState([]);
  const [storyIndex, setStoryIndex] = useState(0);

const stories = [
  {
    title: "Fact check: Trump lies about the price of eggs, groceries and gas",
    outlet: "CNN",
    date: "04.23.25",

    link: "https://www.cnn.com/2025/04/23/politics/price-of-eggs-gas-trump-fact-check/index.html",
    subtext: "Lorium Ipsum Lorem Ipsum",

  },
  {
    title: "Tariff Concerns Drive Global Food Prices to Two-Year High",
    outlet: "BLOOMBERG",
    date: "05.02.25",
    link: "https://www.bloomberg.com/news/articles/2025-05-02/tariff-uncertainty-drives-global-food-prices-to-two-year-high",
    subtext: "Lorium Ipsum Lorem Ipsum",
  },
  {
    title:
      "Higher prices are likely for these 10 grocery items when tariffs hit",
    outlet: "NPR",
    date: "04.04.25",
    link: "https://www.npr.org/2025/04/04/nx-s1-5351324/tariffs-higher-grocery-prices-trump",
    subtext: "Lorium Ipsum Lorem Ipsum",

  },
  {
    title:
      "Most Americans expect higher prices as a result of Trump’s tariffs, a new AP-NORC poll finds",
    outlet: "AP NEWS",
    date: "04.24.25",
    link: "https://apnews.com/article/trump-economy-poll-tariffs-inflation-prices-recession-1d320115e8801e4970bd5cccf2742fc4",
    subtext: "Lorium Ipsum Lorem Ipsum",

  },
  {
    title:
      "Nearly two-thirds of Americans disapprove of Trump tariffs, with inflation a broad concern: POLL",
    outlet: "ABC NEWS",
    date: "04.25.25",
    link: "https://abcnews.go.com/Politics/thirds-americans-disapprove-trump-tariffs-inflation-broad-concern/story?id=121123815",
    subtext: "Lorium Ipsum Lorem Ipsum",

  },
];
  // useEffect(() => {
  //   const shuffled = [...stories].sort(() => 0.5 - Math.random());
  //   setShuffledStories(shuffled);
  // }, []);

  useEffect(() => {
    fetchProductAverages();
  }, []);

  useEffect(() => {
    setEggPercentChange(null); // reset when user searches
  }, [searchQuery]);

  const fetchProductAverages = async () => {
    try {
      const data = await getProductAverages();
      // console.log("Fetched Kroger Data:", data);
      // console.log('march 22', data.filter(d => d.record_day.includes("2025-03-22")));
      setProductAverages(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch product averages:", error);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3); // or whatever increment you'd like
  };

  // ✅ Group by state abbreviation
  const groupedByState = productAverages.reduce((acc, product) => {
    const { state, record_day, product_category, average_price } = product;
    if (!acc[state]) {
      acc[state] = [];
    }
    acc[state].push({
      record_day,
      product_category,
      average_price: parseFloat(average_price),
    });
    return acc;
  }, {});

  // ✅ Normalize search query (convert full name → abbreviation or keep abbreviation)
  const normalizedQuery = searchQuery.trim().toLowerCase();

  // ✅ Get all possible matches (both full names & abbreviations)
  const matchedStates = Object.keys(stateAbbreviations).filter(
    (abbr) =>
      abbr.toLowerCase().includes(normalizedQuery) || // Matches abbreviation
      stateAbbreviations[abbr].toLowerCase().includes(normalizedQuery) // Matches full name (even partial)
  );

  // ✅ Find matching state abbreviations to use for filtering graphs
  const searchKeys = new Set(matchedStates);

  // ✅ Filter the graphs based on matched states
  const filteredStates = Object.keys(groupedByState).filter((state) =>
    searchKeys.has(state)
  );
  let localStoryIndex = 0;

  return (
    <>
      <div className="flex flex-col items-center w-full px-4 mb-6">
        <div
          className="bg-[#E8EA58] absolute top-0 right-0 left-0 h-[40vh]"
          style={{ zIndex: -1 }}
        >
          {/* Blank Space */}
        </div>

        {/* ✅ Search Bar */}
        <div className="relative max-w-6xl mt-10 mb-6 w-full min-w-6xl">
          <input
            type="text"
            placeholder="Enter your state here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 pr-10 w-full rounded-[40px] border-[#231F21] p-6 text-[#231F21BF] text-lg focus:outline-none focus:border-[#231F21]"
            id="search"
          />
          <img
            src={searchArrow}
            alt="Search icon"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10"
          />
        </div>

        {loading ? (
          <p className="mt-4">Collecting data...</p>
        ) : (
          <>
            {filteredStates.length > 0 ? (
              <div
                className={`grid grid-cols-1 ${
                  filteredStates.length > 1 ? "md:grid-cols-1" : ""
                } gap-6 w-full ${
                  filteredStates.length === 1 ? "max-w-6xl" : "max-w-6xl"
                }`}
              >
                {eggPercentChange > 0 && filteredStates.length === 1 && (
                  <SingleStateCTA
                    state={stateAbbreviations[filteredStates[0]]}
                    percent={eggPercentChange}
                  />
                )}
                {filteredStates.slice(0, visibleCount).map((state, index) => {
                  // const shouldShowStatic = (index + 1) % 3 === 0;
                  // const story = shouldShowStatic
                  //   ? shuffledStories[localStoryIndex++]
                  //   : null;
                  // if (shouldShowStatic && storyIndex < shuffledStories.length) {
                  //   setStoryIndex((prev) => prev + 1);
                  // }

                  return (
                    <React.Fragment key={state}>
                      <div>
                        <ProductAveragesGraph
                          state={stateAbbreviations[state]}
                          data={groupedByState[state]}
                          onEggPercentChange={setEggPercentChange}
                        />
                      </div>

                      {/* {shouldShowStatic && story && (
                        <StaticCopy
                          eyebrow={`${story.outlet} • ${story.date}`}
                          bg="#5371FF"
                          color="white"
                          href={`${story.link}`}
                          header={<>{story.title}</>}
                          subtext={`${story.subtext}`}
                        />
                      )} */}
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 w-full max-w-6xl">
                <div className="text-center text-white text-base leading-right bg-[#4D5440] rounded-[24px] p-6 lg:px-36">
                  <p className="text-xl font-normal leading-tight font-barlow font-white">
                    <span className="font-semibold">{searchQuery}</span> doesn’t
                    have daily grocery price data! These charts show the rise in
                    prices across the nation from the year 2000 until the
                    present. {""}
                    <a
                      href="https://fredhelp.stlouisfed.org/fred/about/about-fred/what-is-fred/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="space-x-1 underline underline-offset-4"
                    >
                      Read more about national FRED data here
                    </a>
                    .
                  </p>
                </div>

                <SingleFredDataGraph />
              </div>
            )}
            {filteredStates.length > visibleCount && (
              <button
                onClick={handleLoadMore}
                className="mt-6 px-6 py-3 bg-[#231F21] text-white font-semibold transition uppercase hover:scale-105"
              >
                Load More
              </button>
            )}
          </>
        )}
        <SearchAnotherState />
      </div>
      <Subscribe />
    </>
  );
}

export default SearchByStateWithFred;
