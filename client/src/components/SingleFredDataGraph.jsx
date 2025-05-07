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
import orangeArrow from "../assets/orange-arrow.svg";
import egg from "../assets/egg2.png";
import bread from "../assets/bread2.png";
import coffee from "../assets/coffee2.png";
import steak from "../assets/steak.png";

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
  egg: egg,
  bread: bread,
  beef: steak,
  coffee: coffee,
};

const categoryColors = {
  egg: "#F16941",
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
              className="border-[#231F21] shadow-xl p-4 space-y-3 border rounded-[24px]"
            >
              <div className="flex items-center space-x-2 mb-4 p-6 justify-between">
                <h3 className="text-3xl font-bold text-[#231F21]">
                  National{" "}
                  <span className="font-normal">
                    {" "}
                    {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                    Prices
                  </span>
                </h3>
                <div className="flex flex-row">
                <img
                    src={categoryIcons[category] || {egg}}
                    alt="arrow"
                    style={{ width: 50, height: 50 }}
                  />
                  
                  <img
                    src={orangeArrow}
                    alt="arrow"
                    style={{ width: 50, height: 50 , marginLeft: 4}}
                  />
                </div>
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
                            return `${new Date(
                              `${y}-${m}-${d}T12:00:00`
                            ).toLocaleDateString("en-US", {
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
