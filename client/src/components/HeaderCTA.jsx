import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { getProductAverages } from "../services/api";

function HeaderCTA() {
  const [selectedState, setSelectedState] = useState("CA"); // Default to California
  const [statePrice, setStatePrice] = useState(null);
  const [percentageChange, setPercentageChange] = useState(0);
  const [direction, setDirection] = useState("down");
  const [isModalOpen, setModalOpen] = useState(false);
  const [lowestPriceDate, setLowestPriceDate] = useState(null);
  const [daysAgo, setDaysAgo] = useState(null);

  useEffect(() => {
    const fetchPercentageChange = async () => {
      try {
        const data = await getProductAverages();

        const stateEggPrices = data
          .filter(
            (item) =>
              item.state === selectedState &&
              item.product_category === "Egg 12ct"
          )
          .sort((a, b) => new Date(b.record_day) - new Date(a.record_day));

        if (stateEggPrices.length > 0) {
          const latestPrice = parseFloat(stateEggPrices[0].average_price);

          // ✅ Find the lowest price ever and its date
          let lowest = stateEggPrices[0];
          stateEggPrices.forEach((item) => {
            if (
              parseFloat(item.average_price) < parseFloat(lowest.average_price)
            ) {
              lowest = item;
            }
          });

          // ✅ Find the lowest price value
          const lowestPrice = Math.min(
            ...stateEggPrices.map((item) => parseFloat(item.average_price))
          );

          // ✅ Find the first date this lowest price occurred
          const firstLowestEntry = [...stateEggPrices]
            .reverse() // So earliest first
            .find((item) => parseFloat(item.average_price) === lowestPrice);

          const change = ((latestPrice - lowestPrice) / lowestPrice) * 100;

          const lowestDate = new Date(firstLowestEntry.record_day);

          const today = new Date();
          const diffTime = Math.abs(today - lowestDate);
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

          setStatePrice(latestPrice.toFixed(2));
          setPercentageChange(Math.abs(change.toFixed(2)));
          setDirection(change > 0.001 ? "up" : "down");
          setLowestPriceDate(lowestDate.toDateString());
          setDaysAgo(diffDays);
        } else {
          console.warn("No price data found for selected state.");
          setPercentageChange(0);
        }
      } catch (error) {
        console.error(
          `Failed to fetch percentage change for ${selectedState}:`,
          error
        );
      }
    };

    fetchPercentageChange();
  }, [selectedState]);

  return (
    <div className="w-full h-auto gap-4 p-6 sm:p-10 md:p-16 max-w-6xl mx-auto leading-normal">
      <h1 className="font-barlow font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[75px] tracking-normal">
        The price of eggs 🥚 in
        <span className="ml-2 mr-2">
          <select
            className="border-b-4 border-dashed border-[#5371FF] p-2 rounded bg-white text-black mt-2"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="CA">California</option>
            <option value="TX">Texas</option>
            <option value="VA">Virginia</option>
            <option value="MI">Michigan</option>
          </select>
        </span>
        {percentageChange < 1 ? (
          <>
            <span className="px-2 bg-red-600 text-white font-semibold">
              has not gone down
            </span>{" "}
            in the past {daysAgo !== null && ` ${daysAgo} days`}.
          </>
        ) : (
          <>
            has gone {direction}{" "}
            <span className="px-2 bg-[#E8EA58]">{percentageChange}%</span> in
            the past {daysAgo !== null && ` ${daysAgo} days`}.
          </>
        )}
      </h1>

      <section className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mt-6">
        <p className="text-[#4D5440]">
          Prices are changing, and you might not like what you see.
        </p>
        <a
          href="#"
          className="underline cursor-pointer text-[#4D5440] underline-offset-4"
          onClick={(e) => {
            e.preventDefault();
            setModalOpen(true);
          }}
        >
          How did we arrive at this number?
        </a>
      </section>

      {/* ✅ Render the modal if open */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default HeaderCTA;
