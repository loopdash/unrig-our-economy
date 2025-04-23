import React, { useEffect, useState } from "react";
import { getProductAverages } from "../services/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import shoppingCart from "../assets/shopping-cart.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const categoryIcons = {
  "Egg 12ct": "🥚",
  "Milk 1gal": "🥛",
  "Bread 20oz": "🍞",
  "Beef 1lb": "🥩",
  "Coffee 11 oz": "☕",
};

const categoryColors = {
  "Egg 12ct": "#E8EA58", // eggshell white
  "Milk 1gal": "#A5D8FF", // soft blue
  "Bread 20oz": "#D2B48C", // light brown
  "Beef 1lb": "#8B0000", // dark red
  "Coffee 11 oz": "#4B2E2B", // dark brown
};

function SingleStateGraph({ state = "CA" }) {
  const [productAverages, setProductAverages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(["Egg 12ct"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchProductAverages();
  }, []);

  const fetchProductAverages = async () => {
    try {
      const data = await getProductAverages();
      setProductAverages(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch product averages:", error);
    }
  };

  const groupedByState = productAverages.reduce((acc, product) => {
    const { state, record_day, product_category, average_price } = product;
    if (!acc[state]) acc[state] = [];
    acc[state].push({
      record_day,
      product_category,
      average_price: parseFloat(average_price),
    });
    return acc;
  }, {});

  const stateData = groupedByState[state] || [];
  const sortedData = [...stateData].sort(
    (a, b) => new Date(a.record_day) - new Date(b.record_day)
  );
  const labels = [...new Set(sortedData.map((entry) => entry.record_day))];
  const categories = [
    ...new Set(sortedData.map((entry) => entry.product_category)),
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const categoryStats = selectedCategories.map((category) => {
    const categoryData = sortedData.filter(
      (entry) => entry.product_category === category
    );
    const latest = categoryData[categoryData.length - 1];
    const previous =
      categoryData.length > 1 ? categoryData[categoryData.length - 2] : latest;

    const latestPrice = latest?.average_price || 0;
    const previousPrice = previous?.average_price || latestPrice;

    const percentageChange =
      previousPrice > 0
        ? (((latestPrice - previousPrice) / previousPrice) * 100).toFixed(2)
        : 0;

    const latestDate = new Date(latest?.record_day);
    const previousDate = new Date(previous?.record_day);
    const timeDiff = Math.abs(latestDate - previousDate);
    const daysAgo = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const timeAgoText =
      daysAgo === 1 ? "since yesterday" : `from ${daysAgo} days ago`;

    return { category, latestPrice, percentageChange, timeAgoText };
  });

  return (
    <div className="">
      {loading ? (
        <p className="mt-4">Collecting data...</p>
      ) : stateData.length > 0 ? (
        <div className="w-full bg-[#f6f8ff] rounded-xl p-6 flex flex-col justify-between border-2 border-black">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-black font-medium uppercase">California</h3>
              <h4>Daily Tracker</h4>
            </div>

            <div className="relative">
              <div className="relative group">
                <button
                  className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={shoppingCart}
                    alt="Toggle Categories"
                    className="w-4 h-4"
                  />
                </button>

                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  Shop more items
                </span>
              </div>

              {dropdownOpen && (
                <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-2 border border-gray-300 z-20">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`flex items-center justify-center p-2 rounded-md transition ${
                        selectedCategories.includes(category)
                          ? "bg-blue-100"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleCategory(category)}
                    >
                      <span className="text-lg">
                        {categoryIcons[category] || "🥚"}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex-1 flex flex-col justify-end">
            <div className="h-[200px] md:h-[250px] w-full">
              <Line
                data={{
                  labels,
                  datasets: selectedCategories.map((category, index) => ({
                    label: category,
                    data: labels.map(
                      (day) =>
                        sortedData.find(
                          (entry) =>
                            entry.record_day === day &&
                            entry.product_category === category
                        )?.average_price || null
                    ),
                    borderColor: categoryColors[category] || "black",
                    pointBackgroundColor: categoryColors[category] || "black",
                    pointBorderColor: categoryColors[category] || "black",
                    borderWidth: 2,
                    fill: false,
                  })),
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        title: function (tooltipItems) {
                          const rawDate = tooltipItems[0].label; // "2025-04-02T00:00:00.000Z"

                          // Extract just the date part from the ISO string
                          const [year, month, dayWithTime] = rawDate.split("-");
                          const day = dayWithTime.slice(0, 2); // removes "T00:00:00.000Z"

                          const dateObj = new Date(
                            `${year}-${month}-${day}T12:00:00`
                          ); // noon = safe from timezone shift

                          return `Date: ${dateObj.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}`;
                        },

                        label: (tooltipItem) => {
                          const cat = tooltipItem.dataset.label;
                          const icon = categoryIcons[cat] || "🥚";
                          const price = tooltipItem.raw?.toFixed(2);
                          return `${icon} ${cat}: $${price}`;
                        },
                      },
                    },
                  },
                  scales: {
                    x: { display: false },
                    y: { display: false },
                  },
                  elements: {
                    line: { tension: 0.4 },
                    point: { radius: 3, backgroundColor: "black" },
                  },
                }}
              />
            </div>

            {/* Dashed Line at Bottom */}
            <div className="w-full border-t-2 border-dashed border-blue-400 mt-4"></div>
          </div>
        </div>
      ) : (
        <p className="mt-4">
          Oops, looks like we don't have any shoppers in {state}!
        </p>
      )}
    </div>
  );
}

export default SingleStateGraph;
