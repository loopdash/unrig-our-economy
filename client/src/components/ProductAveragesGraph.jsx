import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ProductAveragesGraph({ state, data }) {
    // ✅ Prepare Chart Data
    const labels = [...new Set(data.map((entry) => entry.record_day))];
    const categories = [...new Set(data.map((entry) => entry.product_category))];

    const datasets = categories.map((category, index) => ({
        label: category,
        data: labels.map(
            (day) =>
                data.find((entry) => entry.record_day === day && entry.product_category === category)
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
                        x: { title: { display: true, text: "Date" } },
                        y: { title: { display: true, text: "Average Price ($)" } },
                    },
                }}
            />
        </div>
    );
}

export default ProductAveragesGraph;
