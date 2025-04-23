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
import shoppingCart from "../assets/shopping-cart.svg";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function FredDataGraph() {
  const [groupedData, setGroupedData] = useState({});
  const [selectedCategories, setSelectedCategories] = useState(["egg"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ✅ Define category icons
  const categoryIcons = {
    egg: "🥚",
    milk: "🥛",
    bread: "🍞",
    beef: "🥩",
    coffee: "☕",
  };

  // ✅ Fetch & Group Data on Load
  useEffect(() => {
    fetchFredData();
  }, []);

  const fetchFredData = async () => {
    try {
      const rawData = await getFredData();
      // console.log("Fetched Data:", rawData);

      // ✅ Group data by category
      const grouped = {};
      rawData.forEach(({ date, price, category }) => {
        // Use the raw date string
        const isoDate = new Date(date).toISOString().split("T")[0]; // e.g., "2025-02-01"

        if (!grouped[category]) grouped[category] = {};
        grouped[category][isoDate] = parseFloat(price);
      });

      setGroupedData(grouped);
    } catch (error) {
      console.error("Failed to fetch FRED data:", error);
    }
  };

  // ✅ Extract unique dates for X-axis
  const labels = [
    ...new Set(
      Object.values(groupedData).flatMap((categoryData) =>
        Object.keys(categoryData)
      )
    ),
  ].sort((a, b) => new Date(a) - new Date(b));

  // ✅ Get available categories
  const categories = Object.keys(groupedData);

  // ✅ Handle Category Toggle
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // ✅ Map Data for Chart
  const datasets = selectedCategories.map((category, index) => ({
    label: category,
    data: labels.map((date) => groupedData[category]?.[date] || null),
    borderColor: "red",
    pointBackgroundColor: "red",
    pointBorderColor: "red",
    borderWidth: 2,
    fill: false,
  }));

  return (
    <div
      className="relative w-full sm:min-w-[40vw] bg-[#f6f8ff] rounded-xl shadow-lg p-4 space-y-3 border border-black
"
    >
      {/* Top Row - Title & Category Selector */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h3 className="text-[#5371FF] font-medium">
            National Grocery Price Tracker
          </h3>
          <h4>Grocery Prices since the year 2000</h4>
        </div>

        {/* ✅ Category Dropdown */}
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
            <div
              className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-2 border border-gray-300"
              style={{ zIndex: 2 }}
            >
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

      {/* ✅ Line Chart */}
      <div className="h-[400px]">
        <Line
          data={{ labels, datasets }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                enabled: true,
                callbacks: {
                  title: function (tooltipItems) {
                    const rawDate = tooltipItems[0].label; // "2025-02-01"
                    const [year, month, day] = rawDate.split("-"); // Split manually
                    const dateObj = new Date(year, month - 1, day); // Construct as local time
                    return `Date: ${dateObj.toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}`;
                  },
                  label: function (tooltipItem) {
                    const dataset = tooltipItem.dataset;
                    const category = dataset.label;
                    const icon = categoryIcons[category] || "🥚";
                    const price = tooltipItem.raw?.toFixed(2);
                    return `${icon} ${
                      category.charAt(0).toUpperCase() + category.slice(1)
                    }: $${price}`;
                  },
                },
              },
            },
            scales: {
              x: {
                display: true,
                ticks: {
                  callback: function (val, index, ticks) {
                    const label = this.getLabelForValue(val); // e.g., "2023-05-01"
                    const year = new Date(label).getFullYear();
                    return year;
                  },
                  autoSkip: true,
                  maxTicksLimit: 10,
                },
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
              },
              y: {
                display: false,
              },
            },
            elements: {
              line: { tension: 0.4 },
              point: { radius: 3, backgroundColor: "black" },
            },
          }}
        />
      </div>

      {/* Bottom Dashed Line */}
      <div className="w-full border-t-2 border-dashed border-blue-400 mt-2"></div>
    </div>
  );
}

export default FredDataGraph;
