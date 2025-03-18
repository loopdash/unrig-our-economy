import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { getFredData } from "../services/api";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function FredDataGraph({ state }) {
    const [data, setData] = useState([]);

    // Fetch products
    useEffect(() => {
        fetchProductAverages();
    }, []);

    const fetchProductAverages = async () => {
        try {
            const data = await getFredData();
            console.log("Fetched Data:", data);
            setData(data);
        } catch (error) {
            console.error("Failed to fetch product averages:", error);
        }
    };

    // ✅ Ensure data is sorted by date
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    // ✅ Extract unique dates for X-axis
    const labels = [...new Set(sortedData.map((entry) => entry.date))];

    // ✅ Extract unique categories
    const categories = [...new Set(sortedData.map((entry) => entry.category))];

    // ✅ Map data to datasets
    const datasets = categories.map((category, index) => ({
        label: category,
        data: labels.map(
            (day) =>
                sortedData.find((entry) => entry.date === day && entry.category === category)?.price || null
        ),
        borderColor: `hsl(${index * 90}, 70%, 50%)`,
        borderWidth: 2,
        fill: false,
    }));

    // ✅ Define chart data
    const chartData = { labels, datasets };

    return (
        <div className="w-full max-w-4xl">
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: `National Grocery Prices` },
                    },
                    scales: {
                        x: { 
                            title: { display: true, text: "Date" },
                            reverse: false, // Ensures earliest date is first
                        },
                        y: { title: { display: true, text: "Price ($)" } },
                    },
                }}
            />
        </div>
    );
}

export default FredDataGraph;