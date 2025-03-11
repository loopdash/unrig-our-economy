import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ProductAveragesGraph({ state, data }) {
    // ✅ Ensure `record_day` is in ascending order (earliest dates first)
    const sortedData = [...data].sort((a, b) => new Date(a.record_day) - new Date(b.record_day));

    // ✅ Get sorted labels (dates)
    const labels = [...new Set(sortedData.map((entry) => entry.record_day))];

    // ✅ Get unique product categories
    const categories = [...new Set(sortedData.map((entry) => entry.product_category))];

    // ✅ Ensure datasets match sorted labels
    const datasets = categories.map((category, index) => ({
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

    // ✅ Define Chart Data
    const chartData = {
        labels,
        datasets,
    };

    return (
        <div>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: `Product Averages in ${state}` },
                    },
                    scales: {
                        x: { 
                            title: { display: true, text: "Date" },
                            reverse: false, // Ensures earliest date is closest to y-axis
                        },
                        y: { title: { display: true, text: "Average Price ($)" } },
                    },
                }}
            />
        </div>
    );
}

export default ProductAveragesGraph;
