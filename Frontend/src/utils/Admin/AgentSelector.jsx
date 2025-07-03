import React, { useEffect, useState } from "react";
import { fetchAgents } from "../../Services/Admin/api";

const AgentSelector = ({ currentAgent, onAgentChange }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgents = async () => {
      const agentList = await fetchAgents();
      setAgents(agentList);
      setLoading(false);

      if (agentList.length > 0 && !currentAgent) {
        onAgentChange(agentList[0]);
      }
    };

    loadAgents();
    const interval = setInterval(loadAgents, 5000);
    return () => clearInterval(interval);
  }, [currentAgent, onAgentChange]);

  const handleChange = (e) => {
    onAgentChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="agent-select"
        className="block text-sm font-semibold text-gray-200 mb-1"
      >
        Select Agent:
      </label>

      {loading ? (
        <div className="text-sm text-gray-400 italic animate-pulse">
          Loading agents...
        </div>
      ) : (
        <select
          id="agent-select"
          value={currentAgent || ""}
          onChange={handleChange}
          className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        >
          <option value="" disabled>
            -- Select an agent --
          </option>
          {agents.map((agent) => (
            <option key={agent} value={agent}>
              {agent}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default AgentSelector;
