import { useState, useEffect } from "react";
import CountUp from "react-countup";
import {
  FiServer,
  FiUsers,
  FiUpload,
  FiDownload,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
import { ipfsStats as initialStats } from "../../Data/SampleData";

const statInfo = {
  connectedPeers: {
    label: "Connected Peers",
    icon: <FiUsers />,
    description: "Number of peers connected to the IPFS network.",
  },
  bandwidthIn: {
    label: "Bandwidth In (MB)",
    icon: <FiDownload />,
    description: "Incoming data bandwidth.",
  },
  bandwidthOut: {
    label: "Bandwidth Out (MB)",
    icon: <FiUpload />,
    description: "Outgoing data bandwidth.",
  },
  latency: {
    label: "Latency (ms)",
    icon: <FiClock />,
    description: "Average network latency.",
  },
  repoSize: {
    label: "Repository Size (GB)",
    icon: <FiServer />,
    description: "Size of your local IPFS repository.",
  },
  pinnedObjects: {
    label: "Pinned Objects",
    icon: <FiAlertCircle />,
    description: "Number of pinned objects stored locally.",
  },
};

const getBarColor = (key, value) => {
  if (key === "latency") {
    if (value < 50) return "bg-green-500";
    if (value < 150) return "bg-yellow-500";
    return "bg-red-500";
  }
  if (key.includes("bandwidth")) {
    if (value > 100) return "bg-green-500";
    if (value > 50) return "bg-yellow-500";
    return "bg-red-500";
  }
  if (key === "connectedPeers") {
    if (value > 50) return "bg-green-500";
    if (value > 20) return "bg-yellow-500";
    return "bg-red-500";
  }
  return "bg-blue-500";
};

const simulateNewStats = (stats) => {
  // Randomly vary stats slightly (±10%)
  const newStats = {};
  for (const key in stats) {
    let val = stats[key];
    if (typeof val === "number") {
      const variation = val * 0.1;
      const randomChange = Math.random() * variation * 2 - variation;
      val = Math.max(0, val + randomChange);
      // Round repoSize and bandwidth to 1 decimal for nicer display
      if (key === "repoSize") val = parseFloat(val.toFixed(1));
      else if (key === "bandwidthIn" || key === "bandwidthOut")
        val = parseFloat(val.toFixed(1));
      else val = Math.round(val);
    }
    newStats[key] = val;
  }
  return newStats;
};

const IPFSStatus = () => {
  const [ipfsStats, setIpfsStats] = useState(() => {
    // Convert string sizes to number for animation convenience
    const parsedStats = { ...initialStats };
    if (typeof parsedStats.repoSize === "string") {
      // e.g. "3.7 GB" -> 3.7
      parsedStats.repoSize = parseFloat(parsedStats.repoSize);
    }
    if (typeof parsedStats.bandwidthIn === "string") {
      parsedStats.bandwidthIn = parseFloat(parsedStats.bandwidthIn);
    }
    if (typeof parsedStats.bandwidthOut === "string") {
      parsedStats.bandwidthOut = parseFloat(parsedStats.bandwidthOut);
    }
    return parsedStats;
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setIpfsStats((prevStats) => simulateNewStats(prevStats));
      setLastUpdated(new Date());
    }, 30000); // every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg mb-8 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <span className="mr-3 p-2 bg-blue-500 bg-opacity-20 rounded-lg text-blue-400">
            🌐
          </span>
          IPFS Network Status
        </h2>
        <span className="text-sm px-3 py-1 bg-green-600 bg-opacity-30 text-green-400 rounded-full flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span>Live</span>
        </span>
      </div>

      <div className="mb-4 text-gray-400 text-sm italic">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {Object.entries(ipfsStats).map(([key, value]) => {
          const info = statInfo[key] || {
            label: key,
            icon: null,
            description: "",
          };
          const barWidth = Math.min(
            100,
            typeof value === "number" ? (value / 100) * 10 : 0
          ); // scale to 100%

          return (
            <div
              key={key}
              className="bg-gray-800 p-5 rounded-xl border border-gray-600 hover:border-blue-500 hover:shadow-lg transition-shadow cursor-default relative"
              title={info.description}
            >
              <div className="flex items-center space-x-2 mb-2 text-gray-300">
                <div className="text-xl">{info.icon}</div>
                <span className="uppercase text-xs font-semibold tracking-wide">
                  {info.label}
                </span>
              </div>
              <div className="text-3xl font-bold text-white">
                <CountUp
                  start={0}
                  end={value}
                  duration={1.5}
                  decimals={
                    typeof value === "number" && value % 1 !== 0 ? 1 : 0
                  }
                  separator=","
                />
              </div>

              {typeof value === "number" && (
                <>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
                    <div
                      className={`${getBarColor(
                        key,
                        value
                      )} h-2.5 rounded-full transition-all duration-500`}
                      style={{ width: `${barWidth}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-400 mt-1">
                    {barWidth.toFixed(1)}%
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IPFSStatus;
