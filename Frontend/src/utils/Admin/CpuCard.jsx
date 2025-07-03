import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const CpuCard = ({ data, history }) => {
  if (!data || !data.cpu) {
    return (
      <div className="bg-white/10 p-4 rounded-lg shadow-md text-white w-full">
        <h2 className="text-lg font-semibold mb-2">CPU</h2>
        <p>No CPU data available</p>
      </div>
    );
  }

  const cpuData = data.cpu;
  const perCpuData = cpuData.per_cpu || [];

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
  const cpuUsageData = history.map((item) => item?.cpu?.percent || 0);

  const cpuChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "CPU Usage %",
        data: cpuUsageData,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const perCpuChartData = {
    labels: perCpuData.map((_, i) => `Core ${i + 1}`),
    datasets: [
      {
        label: `Per-Core Usage (${perCpuData.length} cores)`,
        data: perCpuData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white/10 p-4 rounded-lg shadow-md text-white w-full max-w-md mx-auto mb-6">
      <h2 className="text-lg font-semibold mb-4">
        CPU{" "}
        <span className="text-sm font-normal text-gray-300">
          {data.agent_name}
        </span>
      </h2>

      <div className="mb-2">
        <span className="text-sm font-medium text-gray-300">Total Usage: </span>
        <span className="text-sm font-semibold">
          {cpuData.percent.toFixed(1)}%
        </span>
      </div>

      <div className="w-full h-2 bg-gray-700 rounded mb-4">
        <div
          className="h-full bg-orange-400 rounded"
          style={{ width: `${cpuData.percent}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <span className="text-gray-300">Frequency:</span>{" "}
          <span className="font-medium">{Math.round(cpuData.freq)} MHz</span>
        </div>
        <div>
          <span className="text-gray-300">Cores:</span>{" "}
          <span className="font-medium">
            {cpuData.cores} physical, {cpuData.logical_cores} logical
          </span>
        </div>
        <div>
          <span className="text-gray-300">Temperature:</span>{" "}
          <span className="font-medium">
            {cpuData.temperature ? `${cpuData.temperature}°C` : "N/A"}
          </span>
        </div>
      </div>

      <div className="h-48 mb-4">
        <Line
          data={cpuChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, max: 100 },
              x: {
                display: true,
                title: { display: true, text: "Time" },
              },
            },
          }}
        />
      </div>

      <div className="h-48">
        <Bar
          data={perCpuChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, max: 100 },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CpuCard;
