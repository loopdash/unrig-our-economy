import React, { useEffect, useState } from "react";
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
import { getFredData } from "../services/api";

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
  egg: "🥚",
  milk: "🥛",
  bread: "🍞",
  beef: "🥩",
  coffee: "☕",
};

const categoryColors = {
  egg: "#E8EA58",
  milk: "#A5D8FF",
  bread: "#D2B48C",
  beef: "#8B0000",
  coffee: "#4B2E2B",
};

function SingleFredDataGraph() {
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    fetchFredData();
  }, []);

  const fetchFredData = async () => {
    try {
      const rawData = await getFredData();
      const grouped = {};
      rawData.forEach(({ date, price, category }) => {
        const isoDate = new Date(date).toISOString().split("T")[0];
        if (!grouped[category]) grouped[category] = {};
        grouped[category][isoDate] = parseFloat(price);
      });
      setGroupedData(grouped);
    } catch (error) {
      console.error("Failed to fetch FRED data:", error);
    }
  };

  const labels = [
    ...new Set(
      Object.values(groupedData).flatMap((categoryData) =>
        Object.keys(categoryData)
      )
    ),
  ].sort((a, b) => new Date(a) - new Date(b));

  return (
    <div className="grid grid-cols-1 gap-6 w-full max-w-6xl mx-auto">
  {Object.entries(groupedData)
    .filter(([category]) => ["egg", "beef", "coffee"].includes(category))
    .map(([category, dataMap]) => {
      const dataset = {
        label: category,
        data: labels.map((date) => dataMap[date] ?? null),
        borderColor: categoryColors[category] || "black",
        pointBackgroundColor: categoryColors[category] || "black",
        pointBorderColor: categoryColors[category] || "black",
        borderWidth: 2,
        fill: false,
        spanGaps: true,
      };

      return (
        <div
          key={category}
          className="bg-[#f6f8ff] rounded-xl shadow-lg p-4 border border-black"
        >
          <div className="flex items-center space-x-2 mb-4">
            <h3 className="text-lg font-bold text-[#5371FF]">
              {categoryIcons[category] || "🥚"}{" "}
              {category.charAt(0).toUpperCase() + category.slice(1)} Price Trend
            </h3>
          </div>

          <div className="flex-grow min-h-[500px]">
            <Line
              data={{ labels, datasets: [dataset] }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      title: (tooltipItems) => {
                        const rawDate = tooltipItems[0].label;
                        const [y, m, d] = rawDate.split("-");
                        return `${new Date(`${y}-${m}-${d}T12:00:00`).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}`;
                      },
                      label: (tooltipItem) => {
                        const price = tooltipItem.raw?.toFixed(2);
                        return `$${price}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      callback: function (val) {
                        const label = this.getLabelForValue(val);
                        return new Date(label).getFullYear();
                      },
                      autoSkip: true,
                      maxTicksLimit: 10,
                    },
                    grid: { display: false },
                    border: { display: false },
                  },
                  y: { display: false },
                },
                elements: {
                  line: { tension: 0.4 },
                  point: { radius: 3 },
                },
              }}
            />
          </div>
        </div>
      );
    })}
</div>

  );
}

export default SingleFredDataGraph;
