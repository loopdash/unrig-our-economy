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
import shoppingCart from "../assets/shopping-cart-2.svg";

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
  "Egg 12ct": "#F16941", // eggshell white
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

  const nationalAverages = {
    "Egg 12ct": 1.51,
    "Beef 1lb": 5.11,
    "Coffee 11 oz": 2.4,
  };

  const annotationTextPlugin = {
    id: "annotationText",
    beforeDraw: (chart) => {
      const { ctx, chartArea, scales } = chart;
      const text = chart.options.plugins.annotationText?.text;
      if (!text) return;

      const selected = selectedCategories[0];
      const avgValue = nationalAverages[selected];
      if (!avgValue) return;

      const yPosition = scales.y.getPixelForValue(avgValue) - 6;
      const xPosition = chartArea.left + 2;

      ctx.save();
      ctx.font = "500 12px sans-serif";
      ctx.fillStyle = "#F16941";
      ctx.textAlign = "left";
      ctx.fillText(text, xPosition, yPosition);
      ctx.restore();
    },
  };

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
        <div className="w-full bg-[#FBFBFF] rounded-[38px] p-6 flex flex-col justify-between border-2 border-[#231F21]">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-[#231F21] font-bold uppercase">California</h3>
              <h4>Daily Tracker</h4>
            </div>

            <div className="relative">
              <div className="relative group">
                <button
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={shoppingCart}
                    alt="Toggle Categories"
                    className="w-4 h-4"
                  />
                </button>

                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-[#231F21] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
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
                  datasets: selectedCategories.flatMap((category) => {
                    const baseColor = categoryColors[category] || "black";
                    const nationalAvgValue = nationalAverages[category];

                    return [
                      {
                        label: category,
                        data: labels.map(
                          (day) =>
                            sortedData.find(
                              (entry) =>
                                entry.record_day === day &&
                                entry.product_category === category
                            )?.average_price || null
                        ),
                        borderColor: baseColor,
                        pointBackgroundColor: baseColor,
                        pointBorderColor: baseColor,
                        borderWidth: 2,
                        fill: false,
                        spanGaps: true,
                      },
                      ...(nationalAvgValue
                        ? [
                            {
                              label: "National Average 2000–2020",
                              data: labels.map(() => nationalAvgValue),
                              borderColor: "#F16941",
                              borderWidth: 2,
                              pointRadius: 0,
                              fill: false,
                            },
                          ]
                        : []),
                    ];
                  }),
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
                    annotationText: {
                      display: true,
                      text: "National Average 2000–2020",
                    },
                  },
                  scales: {
                    x: { display: false },
                    y: { display: false },
                  },
                  elements: {
                    line: { tension: 0.4 },
                    point: { radius: 3 },
                  },
                }}
                plugins={[annotationTextPlugin]}
              />
            </div>

            {/* Dashed Line at Bottom */}
            <div className="w-full border-t-2 border-dashed border-[#5471FF] mt-2"></div>
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
