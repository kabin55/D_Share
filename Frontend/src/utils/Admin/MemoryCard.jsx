import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const MemoryCard = ({ data, history }) => {
  if (!data || !data.ram) {
    return (
      <div className="bg-white/10 p-4 rounded-lg shadow-md text-white w-full max-w-md mx-auto mb-6">
        <h2 className="text-lg font-semibold mb-2">Memory (RAM)</h2>
        <p className="text-sm text-gray-300 italic">No memory data available</p>
      </div>
    );
  }

  const ramData = data.ram;

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const timeLabels = history.map((item) =>
    item ? formatTime(new Date(item.timestamp)) : ""
  );
  const ramUsageData = history.map((item) => item?.ram?.percent || 0);

  const ramChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "RAM Usage %",
        data: ramUsageData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const ramPieData = {
    labels: ["Used", "Free"],
    datasets: [
      {
        data: [
          ((ramData.used / ramData.total) * 100).toFixed(1),
          ((ramData.free / ramData.total) * 100).toFixed(1),
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white/10 p-4 rounded-lg shadow-md text-white w-full max-w-md mx-auto mb-6">
      <h2 className="text-lg font-semibold mb-4">
        Memory (RAM){" "}
        <span className="text-sm font-normal text-gray-300">
          {data.agent_name}
        </span>
      </h2>

      <div className="mb-2">
        <span className="text-sm text-gray-300 font-medium">Usage: </span>
        <span className="text-sm font-semibold">
          {ramData.percent.toFixed(1)}%
        </span>
      </div>

      <div className="w-full h-2 bg-gray-700 rounded mb-4">
        <div
          className="h-full bg-teal-400 rounded"
          style={{ width: `${ramData.percent}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
        <div>
          <span className="font-medium">Used:</span> {formatBytes(ramData.used)}
        </div>
        <div>
          <span className="font-medium">Free:</span> {formatBytes(ramData.free)}
        </div>
        <div className="col-span-2">
          <span className="font-medium">Total:</span>{" "}
          {formatBytes(ramData.total)}
        </div>
      </div>

      <div className="h-48 mb-6">
        <Line
          data={ramChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, max: 100 },
              x: { title: { display: true, text: "Time" } },
            },
          }}
        />
      </div>

      <div className="h-48">
        <Pie
          data={ramPieData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: "white" },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MemoryCard;
