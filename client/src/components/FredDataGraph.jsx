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
import shoppingCart from "../assets/shopping-cart-2.svg";

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

  const categoryColors = {
    egg: "#F16941",
    milk: "#A5D8FF",
    bread: "#D2B48C",
    beef: "#8B0000",
    coffee: "#4B2E2B",
  };

  
  // ✅ Fetch & Group Data on Load
  useEffect(() => {
    fetchFredData();
  }, []);

  const fetchFredData = async () => {
    try {
      const rawData = await getFredData();
      // console.log("Fetched Data:", rawData);
      console.log("✅ First 5 Results:", rawData.slice(0, 5));
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
    borderColor: categoryColors[category] || "#000", // fallback to black if not found
    pointBackgroundColor: categoryColors[category] || "#000",
    pointBorderColor: categoryColors[category] || "#000",
    borderWidth: 2,
    fill: false,
  }));

  return (
<div className="relative bg-[#FBFBFF] border-[#231F21] shadow-xl p-4 space-y-3 border-2 rounded-[24px]">

      {/* Top Row - Title & Category Selector */}
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center space-x-2">
        <h3 className="text-[#5371FF] text-md font-bold uppercase tracking-wider">
            National Grocery Price Tracker
          </h3>
          <h4 className="text-lg pl-2">Grocery Prices since the year 2000</h4>
        </div>


        {/* ✅ Category Dropdown */}
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

      <h4 className="text-lg max-w-[70%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </h4>

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
                  callback: function (value, index, values) {
                    const label = this.getLabelForValue(value); // "2023-01-01"
                    const year = label.slice(0, 4); // Extract year string directly
                  
                    const isFirstOfYear = (() => {
                      if (index === 0) return true;
                      const prevLabel = this.getLabelForValue(values[index - 1].value);
                      const prevYear = prevLabel.slice(0, 4);
                      return year !== prevYear;
                    })();
                  
                    return isFirstOfYear ? year : "";
                  },
                  
                  autoSkip: false,
                  maxRotation: 0,
                  minRotation: 0,
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
      <div className="w-full border-t-2 border-dashed border-[#5471FF] mt-2"></div>
    </div>
  );
}

export default FredDataGraph;
