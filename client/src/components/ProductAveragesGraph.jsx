import React, { useState } from "react";
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
import arrowIcon from "../assets/blue-arrow.png";
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

const normalizeCategory = (cat) => {
  const normalized = cat.replace(/\s+/g, "").toLowerCase();
  const aliases = {
    bread: "bread20oz",
    bread20oz: "bread20oz",
    coffee11oz: "coffee11oz",
    coffee11: "coffee11oz",
  };
  return aliases[normalized] || normalized;
};

const categoryIcons = {
  egg12ct: "🥚",
  milk1gal: "🥛",
  bread20oz: "🍞",
  beef1lb: "🥩",
  coffee11oz: "☕",
};

const categoryColors = {
  egg12ct: "#F16941",
  milk1gal: "#A5D8FF",
  bread20oz: "#D2B48C",
  beef1lb: "#8B0000",
  coffee11oz: "#4B2E2B",
};

function ProductAveragesGraph({ state, data }) {
  const sortedData = data.sort(
    (a, b) => new Date(a.record_day) - new Date(b.record_day)
  );
  const labels = [...new Set(sortedData.map((entry) => entry.record_day))];

  const excludedCategories = ["Milk 1gal", "Bread 20oz", "Bread"];
  const categories = [
    ...new Set(
      sortedData
        .map((entry) => entry.product_category)
        .filter((cat) => !excludedCategories.includes(cat))
    ),
  ];

  const [selectedCategories, setSelectedCategories] = useState(["Egg 12ct"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    const timeDiff = Math.abs(
      new Date(latest?.record_day) - new Date(previous?.record_day)
    );
    const daysAgo = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const timeAgoText =
      daysAgo === 1 ? "since yesterday" : `from ${daysAgo} days ago`;
    return { category, latestPrice, percentageChange, timeAgoText };
  });

  return (
<div className="relative bg-[#FDFDFC] border-[#231F21] shadow-xl p-4 space-y-3 border rounded-[24px]">
<div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#231F21] rounded-full"></div>
          <h3 className="text-[#231F21] text-xl font-semibold leading-tight font-barlow">{state}</h3>
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
                    {categoryIcons[normalizeCategory(category)] || "🥚"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
  {categoryStats.map(
    ({ category, latestPrice, percentageChange, timeAgoText }) => (
      <div key={category} className="flex items-center space-x-3">
        {/* 🥚 Emoji - bump size */}
        <span className="text-4xl">
          {categoryIcons[normalizeCategory(category)] || "🥚"}
        </span>

        {/* +% Badge - bump size */}
        {percentageChange > 0 && (
          <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded relative group cursor-pointer font-semibold">
            +{percentageChange}%
            <span className="absolute left-1/2 transform -translate-x-1/2 mt-[1rem] w-max bg-[#231F21] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {timeAgoText}
            </span>
          </span>
        )}

        {/* Price - bump size, change to orange */}
        <span className="text-[#F16941] text-lg font-bold">
          ${latestPrice.toFixed(2)}
        </span>
      </div>
    )
  )}
</div>


      <div className="h-60">
        <Line
          data={{
            labels,
            datasets: selectedCategories
              .map((category) => {
                const normalized = normalizeCategory(category);
                const baseColor = categoryColors[normalized] || "black";
                const nationalAverages = {
                  egg12ct: 1.56,
                  beef1lb: 2.82,
                  coffee11oz: 4.04,
                };
                const nationalAvgValue = nationalAverages[normalized];

                return [
                  {
                    label: category,
                    data: labels.map(
                      (day) =>
                        sortedData.find(
                          (entry) =>
                            entry.record_day === day &&
                            normalizeCategory(entry.product_category) ===
                              normalized
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
                          borderColor: "#5471FF",
                          borderWidth: 2,
                          pointRadius: 0,
                          fill: false,
                        },
                      ]
                    : []),
                ];
              })
              .flat(),
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                enabled: true,
                callbacks: {
                  title: function (tooltipItems) {
                    const rawDate = tooltipItems[0].label;
                    const [year, month, dayWithTime] = rawDate.split("-");
                    const day = dayWithTime.slice(0, 2);
                    const dateObj = new Date(
                      `${year}-${month}-${day}T12:00:00`
                    );
                    return `Date: ${dateObj.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}`;
                  },
                  label: function (tooltipItem) {
                    const dataset = tooltipItem.dataset;
                    if (!dataset.label || dataset.label.includes("National"))
                      return null;
                    const category = dataset.label;
                    const icon =
                      categoryIcons[normalizeCategory(category)] || "🥚";
                    const price = tooltipItem.raw?.toFixed(2);
                    return `${icon} ${category}: $${price}`;
                  },
                },
              },
              // ✅ Custom plugin to draw text
              annotationText: {
                display: true,
                text: "National Average 2000–2020",
              },
            },
            scales: {
              x: {
                display: true,
                ticks: {
                  callback: function (value, index, values) {
                    const label = this.getLabelForValue(value); // "2025-03-15"
                    const current = new Date(label);
                    const currentMonth = current.getMonth();
                    const currentYear = current.getFullYear();
                
                    if (index === 0) return current.toLocaleDateString("en-US", { month: "short", year: "numeric" });
                
                    const prevLabel = this.getLabelForValue(values[index - 1].value);
                    const prev = new Date(prevLabel);
                    const prevMonth = prev.getMonth();
                    const prevYear = prev.getFullYear();
                
                    if (currentMonth !== prevMonth || currentYear !== prevYear) {
                      return current.toLocaleDateString("en-US", { month: "short", year: "numeric" });
                    }
                
                    return ""; // suppress label if same month
                  },
                  autoSkip: false, // let our custom logic control it
                  maxRotation: 0,   // Make sure it's flat
                  minRotation: 0,

                },                          
                grid: { display: false },
                border: { display: false },
              },
              y: {
                display: false,
              },
            },
            elements: {
              line: { tension: 0.4 },
              point: { radius: 3 },
            },
          }}
          plugins={[
            {
              id: "annotationText",
              beforeDraw: (chart) => {
                const { ctx, chartArea, scales } = chart;
                const text = chart.options.plugins.annotationText?.text;
                if (!text) return;
          
                const selected = normalizeCategory(selectedCategories[0]);
                const nationalAverages = {
                  egg12ct: 1.51,
                  beef1lb: 5.11,
                  coffee11oz: 2.4,
                };
                const avgValue = nationalAverages[selected];
                if (!avgValue) return;
          
                const yPosition = scales.y.getPixelForValue(avgValue) - 8; // slightly above line
                const xPosition = scales.x.left + 4;          
                ctx.save();
                ctx.font = "500 12px sans-serif";
                ctx.fillStyle = "#5471FF";
                ctx.textAlign = "left";
                ctx.fillText(text, xPosition, yPosition);
                ctx.restore();
              },
            },
          ]}
          
        />
      </div>

      <div className="w-full border-t-2 border-dashed border-[#5471FF] mt-2"></div>
    </div>
  );
}

export default ProductAveragesGraph;
