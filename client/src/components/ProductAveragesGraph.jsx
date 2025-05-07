import React, { useState, useEffect } from "react";
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

const avg2024Values = {
  egg12ct: {
    value: 3.17,
    label: " 😱 Natl. avg price of eggs in 2024",
    color: "#F16941",
  },
  beef1lb: {
    value: 5.39,
    label: " 😱 Natl. avg price of beef in 2024",
    color: "#8B0000",
  },
  coffee11oz: {
    value: 6.32,
    label: " 😱 Natl. avg price of coffee in 2024",
    color: "#4B2E2B",
  },
};

const normalizeCategory = (cat) => {
  const normalized = cat.replace(/\s+/g, "").toLowerCase();
  const aliases = {
    bread: "bread20oz",
    bread20oz: "bread20oz",
    coffee: "coffee11oz",
    coffee11: "coffee11oz",
    coffee11oz: "coffee11oz",
    "coffee 11oz": "coffee11oz",
    egg: "egg12ct",
    egg12ct: "egg12ct",
    "egg 12ct": "egg12ct",
    beef: "beef1lb",
    beef1lb: "beef1lb",
    "beef 1lb": "beef1lb",
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

const categoryLabel = {
  egg12ct: "/dozen",
  milk1gal: "/gallon",
  bread20oz: "/loaf",
  beef1lb: "/lb",
  coffee11oz: "/bag",
};

const categoryColors = {
  egg12ct: "#F16941",
  milk1gal: "#A5D8FF",
  bread20oz: "#D2B48C",
  beef1lb: "#8B0000",
  coffee11oz: "#4B2E2B",
};

function ProductAveragesGraph({ state, data, onEggPercentChange }) {
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

    const normalized = normalizeCategory(category);
    const avgMeta = avg2024Values[normalized];
    const national2024 = avgMeta?.value || 0;
    
    const percentageChange2024 = 
    national2024 > 0
      ? (((latestPrice - national2024) / national2024) * 100).toFixed(2)
      : 0;
  

    const daysAgo = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const timeAgoText =
      daysAgo === 1 ? "since yesterday" : `from ${daysAgo} days ago`;

    return { category, latestPrice, percentageChange, timeAgoText, percentageChange2024 };
  });

  useEffect(() => {
    const eggCategory = categoryStats.find(
      (stat) => normalizeCategory(stat.category) === "egg12ct"
    );
    if (eggCategory && onEggPercentChange) {
      onEggPercentChange(Number(eggCategory.percentageChange));
    }
  }, [categoryStats, onEggPercentChange]);

  return (
    <div className="relative bg-[#FDFDFC] border-[#231F21] shadow-xl p-4 space-y-3 border-2 rounded-[24px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
            <img
              src={`/states-svg/${state
                .toLowerCase()
                .replace(/\s+/g, "-")}.svg`}
              alt={`${state} icon`}
              className="w-6 h-6 object-contain"
            />
          </div>

          <h3 className="text-[#231F21] text-xl font-semibold leading-tight font-barlow">
            {state}
          </h3>
        </div>

        <div className="relative">
          <div className="relative group">
            <button
              className="rounded-full flex items-center justify-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={shoppingCart}
                alt="Toggle Categories"
                className="w-12 h-12"
              />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-[#231F21] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              Shop more items
            </span>
          </div>

          {dropdownOpen && (
            <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-2 border-2 border-gray-300 z-20">
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
          ({ category, latestPrice, percentageChange, timeAgoText, percentageChange2024 }) => (
            <div key={category} className="flex items-center space-x-3">
              {/* 🥚 Emoji - bump size */}
              <span className="text-4xl">
                {categoryIcons[normalizeCategory(category)] || "🥚"}
              </span>

              {/* +% Badge - bump size */}
              {percentageChange > 0 && (
                <span className="bg-[#F16941] text-white text-sm px-3 py-1 rounded relative group cursor-pointer font-semibold">
                  +{percentageChange}%
                  <span className="absolute left-1/2 transform -translate-x-1/2 mt-[1rem] w-max bg-[#231F21] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {timeAgoText}
                  </span>
                </span>
              )}

              {/* Price - bump size, change to [#F16941] */}
              <span className="text-[#F16941] text-lg font-bold">
                ${latestPrice.toFixed(2)}{" "}
                {categoryLabel[normalizeCategory(category)] || "/dozen"}
              </span>

              {percentageChange2024 > 0 && (
                <span className="bg-[#F16941] text-white text-sm px-3 py-1 rounded relative group cursor-pointer font-semibold">
                  up {percentageChange2024}% from 2024
                </span>
              )}
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
              avg2024DotLabel: {
                selectedCategories: selectedCategories.map(normalizeCategory),
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

                    if (index === 0)
                      return current.toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      });

                    const prevLabel = this.getLabelForValue(
                      values[index - 1].value
                    );
                    const prev = new Date(prevLabel);
                    const prevMonth = prev.getMonth();
                    const prevYear = prev.getFullYear();

                    if (
                      currentMonth !== prevMonth ||
                      currentYear !== prevYear
                    ) {
                      return current.toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      });
                    }

                    return ""; // suppress label if same month
                  },
                  autoSkip: false, // let our custom logic control it
                  maxRotation: 0, // Make sure it's flat
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
            {
              id: "avg2024DotLabel",
              afterDraw: (chart) => {
                const { ctx, scales, options } = chart;
                const selected =
                  options.plugins?.avg2024DotLabel?.selectedCategories || [];

                ctx.save();
                ctx.font = "600 13px sans-serif";

                let offsetIndex = 0;

                selected.forEach((normalized) => {
                  const meta = avg2024Values[normalized];
                  if (!meta) return;

                  const y = scales.y.getPixelForValue(meta.value);
                  const textPadding = 12;
                  const radius = 5;
                  const gapFromDot = 8;
                  const labelText = `${meta.label}: $${meta.value.toFixed(2)}`;
                  const textWidth = ctx.measureText(labelText).width;

                  const labelHeight = 28;
                  const cornerRadius = 6;
                  const x = scales.x.right - 30;
                  const totalLabelWidth = textWidth + textPadding * 2;
                  const labelX = x - radius - totalLabelWidth - gapFromDot;
                  const labelY =
                    y - labelHeight / 2 + offsetIndex * (labelHeight + 6);

                  // Background
                  ctx.beginPath();
                  ctx.moveTo(labelX + cornerRadius, labelY);
                  ctx.lineTo(labelX + totalLabelWidth - cornerRadius, labelY);
                  ctx.quadraticCurveTo(
                    labelX + totalLabelWidth,
                    labelY,
                    labelX + totalLabelWidth,
                    labelY + cornerRadius
                  );
                  ctx.lineTo(
                    labelX + totalLabelWidth,
                    labelY + labelHeight - cornerRadius
                  );
                  ctx.quadraticCurveTo(
                    labelX + totalLabelWidth,
                    labelY + labelHeight,
                    labelX + totalLabelWidth - cornerRadius,
                    labelY + labelHeight
                  );
                  ctx.lineTo(labelX + cornerRadius, labelY + labelHeight);
                  ctx.quadraticCurveTo(
                    labelX,
                    labelY + labelHeight,
                    labelX,
                    labelY + labelHeight - cornerRadius
                  );
                  ctx.lineTo(labelX, labelY + cornerRadius);
                  ctx.quadraticCurveTo(
                    labelX,
                    labelY,
                    labelX + cornerRadius,
                    labelY
                  );
                  ctx.closePath();
                  ctx.fillStyle = meta.color;
                  ctx.fill();

                  // Text
                  ctx.fillStyle = "white";
                  ctx.textAlign = "left";
                  ctx.textBaseline = "middle";
                  ctx.fillText(
                    labelText,
                    labelX + textPadding,
                    labelY + labelHeight / 2
                  );

                  // Dot
                  ctx.beginPath();
                  ctx.arc(
                    x,
                    y + offsetIndex * (labelHeight + 6),
                    radius,
                    0,
                    Math.PI * 2
                  );
                  ctx.fillStyle = meta.color;
                  ctx.fill();

                  offsetIndex++;
                });

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
