import React from "react";
import { Bar } from "react-chartjs-2";
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

const DiskCard = ({ data }) => {
  if (!data || !data.disks || data.disks.length === 0) {
    return (
      <div className="bg-white/10 p-4 rounded-lg shadow-md text-white w-full max-w-md mx-auto mb-6">
        <h2 className="text-lg font-semibold mb-2">Storage</h2>
        <p className="text-sm text-gray-300 italic">No disk data available</p>
      </div>
    );
  }

  const validDisks = data.disks.filter((d) => d.total > 0);

  if (validDisks.length === 0) {
    return (
      <div className="bg-white/10 p-4 rounded-lg shadow-md text-white w-full max-w-md mx-auto mb-6">
        <h2 className="text-lg font-semibold mb-2">Storage</h2>
        <p className="text-sm text-gray-300 italic">
          No valid disk data available
        </p>
      </div>
    );
  }

  const diskChartData = {
    labels: validDisks.map((d) => d.mountpoint),
    datasets: [
      {
        label: "Used",
        data: validDisks.map((d) => d.used / 1024 ** 3),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Free",
        data: validDisks.map((d) => d.free / 1024 ** 3),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white/10 p-4 rounded-lg shadow-md text-white w-full max-w-md mx-auto mb-6">
      <h2 className="text-lg font-semibold mb-4">
        Storage{" "}
        <span className="text-sm font-normal text-gray-300">
          {data.agent_name}
        </span>
      </h2>

      <div className="space-y-4 mb-6">
        {validDisks.map((disk, index) => (
          <div key={index} className="bg-gray-800 p-3 rounded-md">
            <h3 className="text-md font-semibold mb-2">{disk.mountpoint}</h3>

            <div className="text-sm text-gray-300 flex justify-between mb-1">
              <span>Usage</span>
              <span>{disk.percent.toFixed(1)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded mb-2">
              <div
                className="h-full bg-red-500 rounded"
                style={{ width: `${disk.percent}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <div>
                <span className="font-medium">Used: </span>
                {formatBytes(disk.used)}
              </div>
              <div>
                <span className="font-medium">Free: </span>
                {formatBytes(disk.free)}
              </div>
              <div>
                <span className="font-medium">Total: </span>
                {formatBytes(disk.total)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-56">
        <Bar
          data={diskChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { stacked: true },
              y: { stacked: true, beginAtZero: true },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DiskCard;
