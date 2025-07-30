import React, { useEffect, useState } from "react";
import { userActivity } from "../../Data/SampleData.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// 📊 Helper for Signups by Date
const processSignupData = (data) => {
  const counts = data.reduce((acc, item) => {
    const dateKey = new Date(item.createdAt).toISOString().slice(0, 10);
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([date, signups]) => ({ date, signups }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

// Main component
const Users = () => {
  const [userList, setUserList] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [signupData, setSignupData] = useState([]);
  const [topActiveUsers, setTopActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const PIE_COLORS = ["#3b82f6", "#10b981", "#facc15", "#ef4444", "#a855f7"];

  // Load user activity ONCE on mount, no loading blocking the whole page
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await userActivity();
        setActivityData(data);
        setSignupData(processSignupData(data));
        setUserList(data);
      } catch (err) {
        setError("Failed to load user activity.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Fetch pie chart data every 5 seconds from real API ONLY
  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/allfiles`
        );
        const files = await res.json();

        const counts = files.reduce((acc, file) => {
          const user = file.username || "Unknown";
          acc[user] = (acc[user] || 0) + 1;
          return acc;
        }, {});

        const sortedUsers = Object.entries(counts).sort((a, b) => b[1] - a[1]);

        const topFive = sortedUsers.slice(0, 5);
        const others = sortedUsers.slice(5);
        const otherCount = others.reduce((sum, [, count]) => sum + count, 0);

        const chartData = topFive.map(([user, count]) => ({ user, count }));
        if (otherCount > 0) {
          chartData.push({ user: "Other", count: otherCount });
        }

        setTopActiveUsers(chartData);
      } catch (err) {
        console.error("Failed to fetch pie chart data:", err);
      }
    };

    fetchPieChartData(); // initial fetch
    const interval = setInterval(fetchPieChartData, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleToggleBlock = async (userId) => {
    try {
      const userToUpdate = userList.find((u) => u._id === userId);
      if (!userToUpdate) return;

      const updatedStatus = !userToUpdate.block;

      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}/block`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ block: updatedStatus }),
        }
      );

      setUserList((prevUsers) =>
        prevUsers.map((u) =>
          u._id === userId ? { ...u, block: updatedStatus } : u
        )
      );
    } catch (error) {
      console.error("Failed to toggle block status:", error);
    }
  };

  const totalUploads = topActiveUsers.reduce(
    (sum, user) => sum + user.count,
    0
  );

  if (loading) return <div className="text-white">Loading activity...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Charts */}
      <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* New Signups Line Chart */}
        <div className="border border-gray-700 hover:border-blue-500 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-white">New Signups</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={signupData}
              margin={{ top: 10, right: 30, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", borderRadius: 8 }}
              />
              <Legend
                formatter={(value) => (
                  <span className="text-white">{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="signups"
                stroke="#3b82f6"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                animationDuration={800}
                animationEasing="ease-in-out"
                name="New Signups"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 Active Users Pie Chart */}
        <div className="border border-gray-700 hover:border-blue-500 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-white">Top 5 Active Users</h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={topActiveUsers}
                dataKey="count"
                nameKey="user"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ user, percent }) =>
                  `${user} ${(percent * 100).toFixed(0)}%`
                }
                animationDuration={800}
              >
                {topActiveUsers.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  totalUploads > 0
                    ? `${((value / totalUploads) * 100).toFixed(
                        1
                      )}% (${value} uploads)`
                    : "0%"
                }
                contentStyle={{ backgroundColor: "#1f2937", borderRadius: 8 }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">
          User Management
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {userList.map((user) => (
                <tr key={user._id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <img
                      src={user.profilePic || "https://via.placeholder.com/40"}
                      alt={user.username}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="font-medium text-white">
                      {user.username}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">{user._id}</td>
                  <td className="px-6 py-4 text-gray-400 capitalize">
                    {user.gender || "Unknown"}
                  </td>
                  <td className="px-6 py-4 flex space-x-3">
                    <button
                      className={`${
                        user.block
                          ? "text-green-500 hover:text-green-400"
                          : "text-red-500 hover:text-red-400"
                      }`}
                      onClick={() => handleToggleBlock(user._id)}
                    >
                      {user.block ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Recent User Activity
        </h2>
        <ul className="space-y-2 text-gray-300">
          {activityData.length === 0 ? (
            <li>No recent activity found.</li>
          ) : (
            activityData.slice(0, 5).map((item) => (
              <li key={item._id}>
                <span className="text-blue-400 font-semibold">
                  {item.username || "Unknown User"}
                </span>{" "}
                — {item.action || item.activity || "No action"}{" "}
                <span className="text-sm text-gray-400">
                  ({new Date(item.createdAt).toLocaleString()})
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Users;
