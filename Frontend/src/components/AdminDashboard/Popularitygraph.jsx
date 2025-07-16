import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import axios from "axios";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="font-semibold text-gray-300 mb-1">
          {formatFileType(label)}
        </p>
        <p className="text-lg font-bold text-teal-300">
          {payload[0].value} uploads
        </p>
      </div>
    );
  }
  return null;
};

const formatFileType = (type) => {
  if (
    type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "MS Word (.docx)";
  }
  return type;
};

export default function FileTypeBarGraph() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [hoveredBar, setHoveredBar] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/popularity/all-types`
      );
      setData(res.data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching file type data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const getColorForType = (type, isHovered) => {
    const colorMap = {
      "application/pdf": isHovered ? "#EF4444" : "#F87171",
      "text/plain": isHovered ? "#10B981" : "#34D399",
      "image/png": isHovered ? "#3B82F6" : "#60A5FA",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        isHovered ? "#F59E0B" : "#FBBF24",
    };
    return colorMap[type] || (isHovered ? "#8B5CF6" : "#A78BFA");
  };

  return (
    <div className="w-full h-[500px] p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl text-white">
      <div className="flex flex-col mb-4">
        <h2 className="text-2xl font-bold text-center mb-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Real-Time File Uploads
        </h2>
        <p className="text-center text-gray-300 text-sm mb-4">
          Tracking all file uploads across the platform
        </p>

        <div className="flex justify-center items-center mb-2">
          <span className="relative flex h-2 w-2 mr-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                isLoading ? "bg-yellow-400" : "bg-green-400"
              } opacity-75`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isLoading ? "bg-yellow-500" : "bg-green-500"
              }`}
            ></span>
          </span>
          <span className="text-xs text-gray-400">
            {isLoading
              ? "Updating data..."
              : `Last updated: ${lastUpdated.toLocaleTimeString()}`}
          </span>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl h-[calc(100%-120px)] p-4 border border-gray-700">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading file data...</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
              onMouseMove={(state) => {
                if (state.activeTooltipIndex !== undefined) {
                  setHoveredBar(state.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ffffff10"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                stroke="#ffffff60"
                tick={{ fill: "#ffffff90", fontSize: 12 }}
                axisLine={{ stroke: "#ffffff30" }}
                tickMargin={10}
              />
              <YAxis
                type="category"
                dataKey="type"
                width={120}
                stroke="#ffffff60"
                tick={{ fill: "#ffffff", fontSize: 12 }}
                axisLine={{ stroke: "#ffffff30" }}
                tickFormatter={formatFileType}
                tickMargin={10}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "10px",
                  fontSize: "12px",
                  color: "#ffffff90",
                }}
                iconSize={10}
                iconType="circle"
              />
              <Bar
                dataKey="count"
                name="Uploads"
                barSize={24}
                radius={[0, 4, 4, 0]}
                animationDuration={1200}
                isAnimationActive={true}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getColorForType(entry.type, hoveredBar === index)}
                    stroke={hoveredBar === index ? "#ffffff" : "none"}
                    strokeWidth={hoveredBar === index ? 1 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Status Indicators */}
      <div className="flex justify-center space-x-6 mt-4">
        {/* Live Data */}
        <div className="flex items-center">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs text-gray-300">Live Data</span>
        </div>

        {/* Auto-Refreshing */}
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
          <span className="text-xs text-gray-300">Auto-Refreshing</span>
        </div>

        {/* Secure Connection */}
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          <span className="text-xs text-gray-300">Secure Connection</span>
        </div>
      </div>
    </div>
  );
}
