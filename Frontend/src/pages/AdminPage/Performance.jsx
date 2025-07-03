import React, { useState, useEffect } from "react";
import { initSocket } from "../../Services/Admin/socket";
import { fetchAgents } from "../../Services/Admin/api";
import ConnectionStatus from "../../utils/Admin/ConnectionStatus";
import CpuCard from "../../utils/Admin/CpuCard";
import MemoryCard from "../../utils/Admin/MemoryCard";
import DiskCard from "../../utils/Admin/DiskCard";
import NetworkCard from "../../utils/Admin/NetworkCard";

const MAX_HISTORY = 10;

const Performance = () => {
  const [currentAgent, setCurrentAgent] = useState(null);
  const [agentData, setAgentData] = useState(null);
  const [agents, setAgents] = useState([]);
  const [history, setHistory] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  useEffect(() => {
    const socket = initSocket();

    socket.on("connect", () => {
      setConnectionStatus("connected");
      loadAgents();
    });

    socket.on("disconnect", () => setConnectionStatus("disconnected"));
    socket.on("connect_error", () => setConnectionStatus("connection error"));

    socket.on("system_stats", (data) => {
      if (data.agent_name === currentAgent) {
        setAgentData(data.data);
        setHistory((prev) => {
          const newHistory = [...prev, { ...data.data, timestamp: new Date() }];
          return newHistory.length > MAX_HISTORY
            ? newHistory.slice(-MAX_HISTORY)
            : newHistory;
        });
      }
    });

    return () => socket.disconnect();
  }, [currentAgent]);

  const loadAgents = async () => {
    const agentList = await fetchAgents();
    setAgents(agentList);
    if (agentList.length > 0 && !currentAgent) {
      setCurrentAgent(agentList[0]);
    }
  };

  const handleAgentChange = (agentName) => {
    setCurrentAgent(agentName);
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center animate-fade-in">
        Real-Time System Performance Monitor
      </h1>

      <div className="mb-4">
        <ConnectionStatus
          status={connectionStatus}
          agents={agents}
          currentAgent={currentAgent}
          onAgentChange={handleAgentChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <CpuCard data={agentData} history={history} />
        <MemoryCard data={agentData} history={history} />
        <DiskCard data={agentData} />
        <NetworkCard data={agentData} history={history} />
      </div>
    </div>
  );
};

export default Performance;
