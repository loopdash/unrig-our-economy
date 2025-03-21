import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import arrowIcon from "../assets/blue-arrow.png"; 
import shoppingCart from "../assets/shopping-cart.svg";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// ✅ Define category icons
const categoryIcons = {
    "Egg 12ct": "🥚",
    "Milk 1gal": "🥛",
    "Bread 20oz": "🍞",
    "Beef 1lb": "🥩",
    "Coffee 11 oz": "☕"
};

function ProductAveragesGraph({ state, data }) {
    const sortedData = [...data].sort((a, b) => new Date(a.record_day) - new Date(b.record_day));
    const labels = [...new Set(sortedData.map((entry) => entry.record_day))];
    const categories = [...new Set(sortedData.map((entry) => entry.product_category))];

    // ✅ Default to eggs if no category is selected
    const [selectedCategories, setSelectedCategories] = useState(["Egg 12ct"]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // ✅ Handle category selection
    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    // ✅ Get price & percentage change per category
    const categoryStats = selectedCategories.map((category) => {
        const categoryData = sortedData.filter((entry) => entry.product_category === category);
        const latest = categoryData[categoryData.length - 1];
        const previous = categoryData.length > 1 ? categoryData[categoryData.length - 2] : latest;

        const latestPrice = latest?.average_price || 0;
        const previousPrice = previous?.average_price || latestPrice;

        const percentageChange = previousPrice > 0 ? ((latestPrice - previousPrice) / previousPrice * 100).toFixed(2) : 0;

        // ✅ Calculate "X days ago"
        const latestDate = new Date(latest?.record_day);
        const previousDate = new Date(previous?.record_day);
        const timeDiff = Math.abs(latestDate - previousDate);
        const daysAgo = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert ms to days
        const timeAgoText = daysAgo === 1 ? "since yesterday" : `from ${daysAgo} days ago`;

        return { category, latestPrice, percentageChange, timeAgoText };
    });

    return (
        <div className="relative bg-[#f6f8ff] rounded-xl shadow-lg p-4 space-y-3 border border-gray-200">
            {/* Top Row - State Name & Category Selector */}
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-black rounded-full"></div> {/* Black dot */}
                    <h3 className="text-gray-800 font-medium">{state}</h3>
                </div>

                {/* ✅ Category Dropdown */}
                <div className="relative">
                    <button 
                        className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <img src={shoppingCart} alt="Toggle Categories" className="w-4 h-4" />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-2 border border-gray-300" style={{zIndex: 2}}>
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

            {/* ✅ Price & Percentage Change */}
            <div className="space-y-2">
                {categoryStats.map(({ category, latestPrice, percentageChange, timeAgoText }) => (
                    <div key={category} className="flex items-center space-x-2">
                        <span className="text-lg">{categoryIcons[category] || "🥚"}</span>
                        
                        {/* ✅ Tooltip on Hover */}
                        {percentageChange > 0 ? (
                            <span 
                                className="bg-orange-500 text-white text-xs px-2 py-1 rounded relative group cursor-pointer"
                            >
                                {percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`}
                                <span className="absolute left-1/2 transform -translate-x-1/2 mt-[1rem] w-max bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {timeAgoText}
                                </span>
                            </span>
                        ): ""}



                        <span className="text-blue-600 text-sm font-semibold">${latestPrice.toFixed(2)}</span>
                    </div>
                ))}
            </div>

            {/* ✅ Line Chart */}
            <div className="h-20">
                <Line
                    data={{
                        labels,
                        datasets: selectedCategories.map((category, index) => ({
                            label: category,
                            data: labels.map(
                                (day) =>
                                    sortedData.find((entry) => entry.record_day === day && entry.product_category === category)
                                        ?.average_price || null
                            ),
                            borderColor: `hsl(${index * 90}, 70%, 50%)`,
                            borderWidth: 2,
                            fill: false,
                        }))
                    }}
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
                                        const dataset = tooltipItem.dataset;
                                        const category = dataset.label;
                                        const icon = categoryIcons[category] || "🥚";
                                        const price = tooltipItem.raw?.toFixed(2);
                                        return `${icon} ${category}: $${price}`;
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
