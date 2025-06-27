import React, { useEffect, useState } from "react";
import { getProductAverages } from "../services/api";
import ProductAveragesGraph from "../components/ProductAveragesGraph";
import searchArrow from "../assets/search-arrow-2.png";
import SearchAnotherState from "../components/SearchAnotherState";
import Subscribe from "../components/Subscribe";
import SingleFredDataGraph from "../components/SingleFredDataGraph";
import SingleStateCTA from "../components/SingleStateCTA";
import StaticCopy from "../components/StaticCopy";
import { useLocation } from "react-router-dom";
import allRegionalData from "../assets/allRegionalData";
import RegionalAveragesGraph from "../components/RegionalAveragesGraph";
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

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        // Wait for layout shift to finish first
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // Delay ensures element is rendered
      }
    }
  }, [location]);
const targetStates = {
  ct: "Northeast",
  de: "South",
  hi: "West",
  ia: "Midwest",
  ma: "Northeast",
  me: "Northeast",
  mn: "Midwest",
  nd: "Midwest",
  nh: "Northeast",
  nj: "Northeast",
  ny: "Northeast",
  ok: "South",
  pa: "Northeast",
  ri: "Northeast",
  sd: "Midwest",
  vt: "Northeast",
  fl: "South",
  nc: "South",
  md: "South",
  connecticut: "Northeast",
  delaware: "South",
  hawaii: "West",
  iowa: "Midwest",
  massachusetts: "Northeast",
  maine: "Northeast",
  minnesota: "Midwest",
  "north dakota": "Midwest",
  "new hampshire": "Northeast",
  "new jersey": "Northeast",
  "new york": "Northeast",
  oklahoma: "South",
  pennsylvania: "Northeast",
  "rhode island": "Northeast",
  "south dakota": "Midwest",
  vermont: "Northeast",
  florida: "South",
  "north carolina": "South",
  maryland: "South",
};

function getRegionForState(stateInput) {
  const normalized = stateInput.trim().toLowerCase();
  return targetStates[normalized] || null;
}


  const region = getRegionForState(searchQuery); // Get the region from state input
  const hasRegionMatch = region !== null;
  const regionalData = allRegionalData.filter(
    (entry) => entry.region === region
  );

  const regionText = [
    {
      region: "Northeast",
      icon: "🔹",
      text: "Egg and beef prices reflect BLS monthly averages for the Northeast Census Region. Data is reported by the U.S. Bureau of Labor Statistics and represents regional urban price trends.",
    },
    {
      region: "Midwest",
      icon: "🔸",
      text: "Prices are sourced from BLS regional data for the Midwest Census Region. Monthly values reflect average retail food prices across urban markets in this region.",
    },
    {
      region: "South",
      icon: "🔻",
      text: "Retail prices for eggs and beef are based on BLS data from the South Region, which includes the Southeastern and parts of the Mid-Atlantic U.S.",
    },
    {
      region: "West (including HI)",
      icon: "🔼",
      text: "West Region prices are pulled from BLS monthly tables and represent an average of states in the Pacific and Mountain divisions. Hawaii is included in this grouping.",
    },
    {
      region: "Hawaii",
      icon: "🌺",
      text: "Egg prices are based on reports from the Hawaiʻi Department of Agriculture (HDOA). Monthly prices are estimated using interpolation between official reports. Beef prices are using BLS West Region data, which includes Hawaii.",
    },
  ];
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
      <div
        id="start-search"
        className="flex flex-col items-center w-full px-4 mb-6"
      >
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
                } gap-6 w-full max-w-6xl`}
              >
                {eggPercentChange > 0 && filteredStates.length === 1 && (
                  <SingleStateCTA
                    state={stateAbbreviations[filteredStates[0]]}
                    percent={eggPercentChange}
                  />
                )}

                {filteredStates.slice(0, visibleCount).map((state, index) => (
                  <React.Fragment key={state}>
                    <div>
                      <ProductAveragesGraph
                        state={stateAbbreviations[state]}
                        data={groupedByState[state]}
                        onEggPercentChange={setEggPercentChange}
                      />
                    </div>
                  </React.Fragment>

                ))}
                                                      <div className="px-6 mb-6">
                      <div className="text-3xl font-bold text-[#231F21] mb-2">
                       🛒  Kroger States 
                      </div>
                      <p className="mb-4 pb-4 font-normal text-2xl leading-normal font-barlow text-[#231F21]">Retail egg and beef prices for select states were sourced directly from the Kroger API, which reflects real-time in-store prices from Kroger and affiliated banners.</p>
                    </div>
              </div>
            ) : hasRegionMatch && regionalData.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 w-full max-w-6xl">
                <RegionalAveragesGraph
                  state={searchQuery}
                  data={regionalData}
                />
                {(() => {
                  const regionKey =
                    region === "West" ? "West (including HI)" : region;
                  const matched = regionText.find(
                    (r) => r.region === regionKey || r.region === region
                  );
                  return matched ? (
                    <div className="px-6 mb-6">
                      <div className="text-3xl font-bold text-[#231F21] mb-2">
                        {matched.icon} {matched.region}
                      </div>
                      <p className="mb-4 pb-4 font-normal text-2xl leading-normal font-barlow text-[#231F21]">{matched.text}</p>
                    </div>
                  ) : null;
                })()}

                <SingleFredDataGraph />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 w-full max-w-6xl">
                <div className="text-center text-white text-base leading-right bg-[#4D5440] rounded-[24px] p-6 lg:px-36">
                  <p className="text-xl font-normal leading-tight font-barlow font-white">
                    <span className="font-semibold">{searchQuery}</span> doesn’t
                    have daily grocery price data! These charts show the rise in
                    prices across the nation from the year 2000 until the
                    present.{" "}
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
