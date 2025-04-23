import React, { useEffect, useState } from "react";
import { getProductAverages } from "../services/api";
import ProductAveragesGraph from "../components/ProductAveragesGraph";
import HeaderCTA from "../components/HeaderCTA";
import DailyTicker from "../components/DailyTicker";
import FredDataGraph from "../components/FredDataGraph";
import Button from "../components/Button";
import CTA from "../components/CTA";
import TopStories from "../components/TopStories";
import SingleStateData from "../components/SingleStateGraph";
import Subscribe from "../components/Subscribe";

function Home() {
  const [prices, setPrices] = useState({
    TX: null,
    CA: null,
    VA: null,
  });

  useEffect(() => {
    const fetchStatePrices = async () => {
      try {
        const data = await getProductAverages();
        // console.log("Fetched Product Data:", data);

        // ✅ Helper function to get latest price for a state
        const getLatestPrice = (stateCode) => {
          const filteredPrices = data
            .filter(
              (item) =>
                item.state === stateCode && item.product_category === "Egg 12ct"
            )
            .sort((a, b) => new Date(b.record_day) - new Date(a.record_day));

          return filteredPrices.length > 0
            ? parseFloat(filteredPrices[0].average_price).toFixed(2)
            : null;
        };

        setPrices({
          TX: getLatestPrice("TX"),
          CA: getLatestPrice("CA"),
          VA: getLatestPrice("VA"),
        });
      } catch (error) {
        console.error("Failed to fetch egg prices:", error);
      }
    };

    fetchStatePrices();
  }, []);

  return (
    <div>
      {/* ✅ Dropdown for selecting a state */}
      <div className="flex justify-center mb-4"></div>

      {/* ✅ Pass selected state to HeaderCTA */}
      <HeaderCTA />

      <DailyTicker
        texasPrice={prices.TX}
        californiaPrice={prices.CA}
        virginiaPrice={prices.VA}
      />

      <section className="flex flex-col items-center space-y-4 pt-8 max-w-6xl justify-center mx-2 sm:mx-auto">
        <div
          className="flex flex-col items-start justify-center rounded-[38px] w-full bg-[#f6f8ff] rounded-xl shadow-lg p-12 space-y-3 min-h-fit rounded-3xl text-white mx-auto max-h-xl min-h-xl"
          style={{ backgroundColor: "#E8EA58" }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider mb-4 text-black">
            Rising prices, shrinking wallets
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-black max-w-[70%] ">
            The cost of living for hardworking Americans continues to climb.
          </h2>
          <p className="mb-4 font-normal text-lg leading-[125%] tracking-[0] pb-4 text-black">
            Some of the most essential items in your grocery cart have seen
            dramatic price increases. While families are struggling to make ends
            meet, corporations are reaping the rewards. This page breaks down
            how these prices have changed under the Trump administration and
            what policies have contributed to the rising costs.
          </p>

          <a
            href={"/search-by-state"}
  className="inline-block w-full md:w-1/2 text-center leading-[40px] uppercase transition-transform duration-200 hover:scale-105"
            style={{
              backgroundColor: "black",
              color: "white",
              border: `3px solid black`,
              boxShadow: `-4px 4px 0 0 black`,
            }}
          >
            See State-level grocery prices
          </a>
        </div>
        <FredDataGraph />
      </section>
      <div className="">
        <CTA />
        <TopStories />
      </div>

      <section className="flex flex-col sm:flex-row sm:items-stretch sm:space-x-4 space-y-4 sm:space-y-0 pb-6 mx-2 sm:mx-auto max-w-6xl">
  <div className="w-full sm:w-1/2">
    <SingleStateData state="CA" />
  </div>

  <div
    className="w-full sm:w-1/2 flex flex-col items-start justify-center rounded-[38px] bg-[#f6f8ff] shadow-lg p-12 space-y-3 text-white mx-auto"
    style={{ backgroundColor: "black" }}
  >
    <h2 className="font-semibold uppercase tracking-wider ">
      Daily Tracker
    </h2>
    <p className="mb-4 font-normal text-md leading-[125%] tracking-[0] pb-4">
      How the prices of eggs, milk, meat, bread, and coffee have soared under his watch.
    </p>
    <Button
      href={"/search-by-state"}
      text={"See State-level grocery prices"}
      color={"#E8EA58"}
      textColor="black"
      bgColor={"#E8EA58"}
    />
  </div>
</section>

      <Subscribe />
    </div>
  );
}

export default Home;
