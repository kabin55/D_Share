import React from "react";

const ConnectionStatus = ({ status, agents, currentAgent, onAgentChange }) => {
  const statusColors = {
    connected: "bg-green-500",
    disconnected: "bg-red-500",
    "connection-error": "bg-yellow-500",
  };

  const statusTextColors = {
    connected: "text-green-600",
    disconnected: "text-red-600",
    "connection-error": "text-yellow-600",
  };

  const normalizedStatus = status.toLowerCase().replace(" ", "-");
  const colorClass = statusColors[normalizedStatus] || "bg-gray-400";
  const textColorClass = statusTextColors[normalizedStatus] || "text-gray-600";

  return (
    <div className="flex flex-wrap items-center gap-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">Connection:</span>
        <span className={`text-sm font-semibold ${textColorClass}`}>
          {status}
        </span>
        <span className={`w-3 h-3 rounded-full ${colorClass}`}></span>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        <label
          htmlFor="agent-select"
          className="text-sm font-medium text-gray-700"
        >
          Agent:
        </label>
        <select
          id="agent-select"
          value={currentAgent || ""}
          onChange={(e) => onAgentChange(e.target.value)}
          className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an agent</option>
          {agents.map((agent) => (
            <option key={agent} value={agent}>
              {agent}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ConnectionStatus;
