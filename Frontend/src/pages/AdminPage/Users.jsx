import React from "react";
import { users } from "../../Data/SampleData";
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

const signupData = [
  { date: "Mon", signups: 2 },
  { date: "Tue", signups: 1 },
  { date: "Wed", signups: 2 },
  { date: "Thu", signups: 2 },
  { date: "Fri", signups: 4 },
  { date: "Sat", signups: 6 },
  { date: "Sun", signups: 3 },
];

const userRoleData = [
  { name: "Admin", value: 4 },
  { name: "User", value: 8 },
  { name: "Editor", value: 3 },
  { name: "Moderator", value: 2 },
];

const COLORS = ["#3b82f6", "#10b981", "#facc15", "#ef4444"];

const Users = () => {
  // Example edit/view activity handlers
  const handleEdit = (userId) => {
    alert(`Edit user with ID: ${userId}`);
  };

  const handleViewActivity = (userId) => {
    alert(`View activity for user with ID: ${userId}`);
  };

  return (
    <div className="space-y-6">
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
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Storage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-10 w-10 rounded-full ${user.avatarColor} flex items-center justify-center text-white`}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-white hover:text-blue-400">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-400 hover:text-gray-300">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-400 hover:text-blue-400">
                        Last active: {user.lastActive}
                      </div>
                      <div className="text-sm text-gray-400 hover:text-blue-400">
                        Files shared: {user.filesShared}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full"
                        style={{
                          width: `${parseInt(user.storageUsed)}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-sm mt-1 text-gray-400 hover:text-blue-400">
                      {user.storageUsed} used
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-400 hover:text-blue-300 mr-3"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-gray-400 hover:text-gray-300"
                      onClick={() => handleViewActivity(user.id)}
                    >
                      View Activity
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

        {/* User Roles Pie Chart */}
        <div className="border border-gray-700 hover:border-blue-500 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-white">User Roles</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={userRoleData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
                animationDuration={800}
              >
                {userRoleData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", borderRadius: 8 }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend
                formatter={(value) => (
                  <span className="text-white">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Users;
