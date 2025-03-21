import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { getFredData } from "../services/api";
import shoppingCart from "../assets/shopping-cart.svg";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function FredDataGraph() {
    const [groupedData, setGroupedData] = useState({});
    const [selectedCategories, setSelectedCategories] = useState(["eggs"]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // ✅ Define category icons
    const categoryIcons = {
        "eggs": "🥚",
        "milk": "🥛",
        "bread": "🍞",
        "beef": "🥩",
        "coffee": "☕"
    };

    // ✅ Fetch & Group Data on Load
    useEffect(() => {
        fetchFredData();
    }, []);

    const fetchFredData = async () => {
        try {
            const rawData = await getFredData();
            console.log("Fetched Data:", rawData);

            // ✅ Group data by category
            const grouped = {};
            rawData.forEach(({ date, price, category }) => {
                const formattedDate = new Date(date).toLocaleString("en-US", { month: "short", year: "numeric" });

                if (!grouped[category]) grouped[category] = {};
                grouped[category][formattedDate] = parseFloat(price);
            });

            setGroupedData(grouped);
        } catch (error) {
            console.error("Failed to fetch FRED data:", error);
        }
    };

    // ✅ Extract unique dates for X-axis
    const labels = [...new Set(
        Object.values(groupedData)
            .flatMap((categoryData) => Object.keys(categoryData))
    )].sort((a, b) => new Date(a) - new Date(b));

    // ✅ Get available categories
    const categories = Object.keys(groupedData);

    // ✅ Handle Category Toggle
    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    // ✅ Map Data for Chart
    const datasets = selectedCategories.map((category, index) => ({
        label: category,
        data: labels.map((date) => groupedData[category]?.[date] || null),
        borderColor: `hsl(${index * 90}, 70%, 50%)`,
        borderWidth: 2,
        fill: false,
    }));

    return (
        <div className="relative bg-[#f6f8ff] rounded-xl shadow-lg p-4 space-y-3 border border-gray-200">
            {/* Top Row - Title & Category Selector */}
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-black rounded-full"></div> {/* National Indicator */}
                    <h3 className="text-gray-800 font-medium">National</h3>
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
                        <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-2 border border-gray-300" style={{ zIndex: 2 }}>
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

            {/* ✅ Line Chart */}
            <div className="h-20">
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
                                    title: function(tooltipItem) {
                                        return `Date: ${tooltipItem[0].label}`;
                                    },
                                    label: function(tooltipItem) {
                                        return `$${tooltipItem.raw?.toFixed(2)}`;
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

export default FredDataGraph;
