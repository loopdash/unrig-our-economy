import React from "react";
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
  egg12ct: "#E8EA58",
  milk1gal: "#A5D8FF",
  bread20oz: "#D2B48C",
  beef1lb: "#8B0000",
  coffee11oz: "#4B2E2B",
};

function SingleProductSingleStateGraph({ state, data }) {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.record_day) - new Date(b.record_day)
  );

  const labels = [...new Set(sortedData.map((entry) => entry.record_day))];
  const category = sortedData[0]?.product_category || "Unknown";

  const latest = sortedData[sortedData.length - 1];
  const previous =
    sortedData.length > 1
      ? sortedData[sortedData.length - 2]
      : latest;

  const latestPrice = latest?.average_price || 0;
  const previousPrice = previous?.average_price || latestPrice;

  const percentageChange =
    previousPrice > 0
      ? (((latestPrice - previousPrice) / previousPrice) * 100).toFixed(2)
      : 0;

  const latestDate = new Date(latest?.record_day);
  const previousDate = new Date(previous?.record_day);
  const daysAgo = Math.ceil(
    Math.abs(latestDate - previousDate) / (1000 * 60 * 60 * 24)
  );

  const timeAgoText =
    daysAgo === 1 ? "since yesterday" : `from ${daysAgo} days ago`;

  return (
    <div className="relative bg-[#f6f8ff] rounded-xl shadow-lg p-4 space-y-3 border border-gray-200">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#231F21] rounded-full" />
          <h3 className="text-gray-800 font-medium">{state}</h3>
        </div>

        <div className="flex items-center space-x-1">
          <span className="text-lg">{categoryIcons[normalizeCategory(category)] || "❓"}</span>
          <span className="text-gray-600 text-sm">{category}</span>
        </div>
      </div>

      {/* Price + Change */}
      <div className="flex items-center space-x-3">
        <span className="text-blue-600 text-sm font-semibold">
          ${parseFloat(latestPrice).toFixed(2)}
        </span>
        {percentageChange !== "0.00" && (
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
            {percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`}
          </span>
        )}
        <span className="text-xs text-gray-500">{timeAgoText}</span>
      </div>

      {/* Chart */}
      <div className="h-60">
        <Line
          data={{
            labels,
            datasets: [
              {
                label: category,
                data: labels.map(
                  (day) =>
                    sortedData.find((entry) => entry.record_day === day)
                      ?.average_price || null
                ),
                borderColor:
                  categoryColors[normalizeCategory(category)] || "black",
                pointBackgroundColor:
                  categoryColors[normalizeCategory(category)] || "black",
                pointBorderColor:
                  categoryColors[normalizeCategory(category)] || "black",
                borderWidth: 2,
                fill: false,
                spanGaps: true,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
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
                    const price = tooltipItem.raw?.toFixed(2);
                    return `${categoryIcons[normalizeCategory(category)] || "❓"} ${category}: $${price}`;
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

      <div className="w-full border-t-2 border-dashed border-blue-400 mt-2"></div>
    </div>
  );
}

export default SingleProductSingleStateGraph;
