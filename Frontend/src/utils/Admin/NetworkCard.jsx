import React from "react";
import { Line } from "react-chartjs-2";
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

const NetworkCard = ({ data, history }) => {
  if (!data || !data.network) {
    return (
      <div className="bg-white/10 p-4 rounded-lg shadow-md text-white w-full max-w-md mx-auto mb-6">
        <h2 className="text-lg font-semibold mb-2">Network</h2>
        <p className="text-sm text-gray-300 italic">
          No network data available
        </p>
      </div>
    );
  }

  const networkData = data.network;

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
  const sentSpeeds = history.map((item) => item?.network?.sent_speed_mbps || 0);
  const recvSpeeds = history.map((item) => item?.network?.recv_speed_mbps || 0);

  const networkChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Upload (Mbps)",
        data: sentSpeeds,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
      {
        label: "Download (Mbps)",
        data: recvSpeeds,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white/10 p-4 rounded-lg shadow-md text-white w-full max-w-md mx-auto mb-6">
      <h2 className="text-lg font-semibold mb-4">
        Network{" "}
        <span className="text-sm font-normal text-gray-300">
          {data.agent_name}
        </span>
      </h2>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
        <div>
          <span className="font-medium">Sent:</span>{" "}
          {(networkData.bytes_sent / 1024 ** 2).toFixed(2)} MB
        </div>
        <div>
          <span className="font-medium">Received:</span>{" "}
          {(networkData.bytes_recv / 1024 ** 2).toFixed(2)} MB
        </div>
        <div className="col-span-2">
          <span className="font-medium">Speed:</span> ↑{" "}
          {networkData.sent_speed_mbps?.toFixed(2) || "0"} Mbps ↓{" "}
          {networkData.recv_speed_mbps?.toFixed(2) || "0"} Mbps
        </div>
      </div>

      <div className="h-48">
        <Line
          data={networkChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true },
              x: { title: { display: true, text: "Time" } },
            },
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

export default NetworkCard;
