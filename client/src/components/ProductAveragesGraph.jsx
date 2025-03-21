import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import arrowIcon from "../assets/blue-arrow.png"; 
import eggIcon from "../assets/egg.png";
import shoppingCart from "../assets/shopping-cart.svg";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// ✅ Define category icons (emoji-based)
const categoryIcons = {
    "Egg 12ct": "🥚",
    "Milk 1gal": "🥛",
    "Bread 20oz": "🍞",
    "Beef 1lb": "🥩",
    "Coffee 11 oz": "☕"
};

function ProductAveragesGraph({ state, data, percentageChange, price }) {
    // ✅ Ensure `record_day` is in ascending order
    const sortedData = [...data].sort((a, b) => new Date(a.record_day) - new Date(b.record_day));

    // ✅ Get sorted labels (dates)
    const labels = [...new Set(sortedData.map((entry) => entry.record_day))];

    // ✅ Get unique product categories
    const categories = [...new Set(sortedData.map((entry) => entry.product_category))];

    // ✅ Manage selected categories (allow multiple selections)
    const [selectedCategories, setSelectedCategories] = useState([categories[0]]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // ✅ Handle category selection (toggle on/off)
    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    // ✅ Ensure datasets match sorted labels for selected categories
    const datasets = selectedCategories.map((category, index) => ({
        label: category,
        data: labels.map(
            (day) =>
                sortedData.find((entry) => entry.record_day === day && entry.product_category === category)
                    ?.average_price || null
        ),
        borderColor: `hsl(${index * 90}, 70%, 50%)`,
        borderWidth: 2,
        fill: false,
    }));

    const chartData = {
        labels,
        datasets,
    };

    return (
        <div className="relative bg-white rounded-xl shadow-lg p-4 space-y-3 border border-gray-200">
            {/* Top Row - State Name & Category Selector */}
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-black rounded-full"></div> {/* Black dot */}
                    <h3 className="text-gray-800 font-medium">{state}</h3>
                </div>

                {/* ✅ Category Dropdown Toggle */}
                <div className="flex flex-row items-center gap-2">
                    <button 
                        className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <img src={shoppingCart} alt="Toggle Categories" className="w-4 h-4" />
                    </button>
                    <img src={arrowIcon} alt="Direction Arrow" className="w-4 h-4" />
                    {/* ✅ Category Dropdown */}
                    {dropdownOpen && (
                        <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-2 border border-gray-300">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`flex items-center justify-center p-2 rounded-md transition ${
                                        selectedCategories.includes(category) ? "bg-blue-100" : "hover:bg-gray-100"
                                    }`}
                                    onClick={() => toggleCategory(category)}
                                >
                                    <span className="text-lg">{categoryIcons[category] || "🥚"}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Price Info */}
            <div className="flex items-center space-x-2">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    {percentageChange !== undefined ? 
                        (percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`) 
                        : "0%"}
                </span>

                <span className="text-blue-600 text-sm font-semibold">${(price || 0).toFixed(2)}</span>
            </div>

            {/* Line Chart */}
            <div className="h-20">
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { 
                            legend: { display: false },
                            tooltip: { 
                                enabled: true, // ✅ Enables hover tooltip
                                callbacks: {
                                    title: function(tooltipItem) {
                                        const date = new Date(tooltipItem[0].label);
                                        return `Date: ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
                                    },
                                    label: function(tooltipItem) {
                                        const datasetIndex = tooltipItem.datasetIndex;
                                        const category = datasets[datasetIndex]?.label || "Unknown";
                                        return `${category}: $${tooltipItem.raw.toFixed(2)}`; // Show category name & price
                                    }
                                }
                            }
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

            {/* Bottom Dashed Line */}
            <div className="w-full border-t-2 border-dashed border-blue-400 mt-2"></div>
        </div>
    );
}

export default ProductAveragesGraph;
