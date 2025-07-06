import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";

import { FILE_TYPE_ICONS } from "../../Data/Constants";
import { userActivity } from "../../Data/SampleData";

const Files = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/allfiles`);
        const data = await res.json();
        console.log("Fetched files:", data);
  <div className="text-sm text-gray-400">
  const date = {data.date ? new Date(data.date).toLocaleDateString("en-US", { weekday: "long" }) : "N/A"}
  console.log(date)
</div>

        setFileList(data);
      } catch (err) {
        console.error("Error fetching files:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const filteredFiles = fileList.filter(
    (data) =>
      data.filename?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileTypeIcon = (type) => FILE_TYPE_ICONS[type] || FILE_TYPE_ICONS.default;

  const storageData = [
    { name: "Documents", value: 400 },
    { name: "Images", value: 300 },
    { name: "Videos", value: 200 },
    { name: "Others", value: 100 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
  
  const fileTypesData = [
    { day: "Mon", documents: 4, images: 2, docs: 1 },
    { day: "Tue", documents: 3, images: 5, docs: 2 },
    { day: "Wed", documents: 6, images: 3, docs: 3 },
    { day: "Thu", documents: 4, images: 4, docs: 2 },
    { day: "Fri", documents: 5, images: 6, docs: 3 },
  ];
 


  const activityCountsByUser = userActivity.reduce((acc, act) => {
    acc[act.user] = (acc[act.user] || 0) + 1;
    return acc;
  }, {});

  const activityChartData = Object.entries(activityCountsByUser).map(([user, count]) => ({
    user,
    count,
  }));

  return (
    <div className="space-y-6">
      {/* FILE MANAGEMENT TABLE */}
      <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">File Management</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search files..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 hover:border-blue-500 text-white">
            <option>All Types</option>
            <option>Documents</option>
            <option>Images</option>
            <option>Videos</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  File
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredFiles.map((data) => (
                <tr key={data._id || data.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">
                        {getFileTypeIcon(data.type)}
                      </span>
                      <div>
                        <div className="font-medium text-white hover:text-blue-400">
                          {data.filename}
                        </div>
                        <div className="text-sm text-gray-400 hover:text-gray-300">
                          {data.size} • {data.date} • {data.sharedBy}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      <div>
                        <div className="text-sm font-medium text-gray-300">
                          Downloads
                        </div>
                        <div className="text-blue-400">{data.downloads || 0}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-300">
                          Views
                        </div>
                        <div className="text-green-400">{data.views || 0}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-300">
                          Last Access
                        </div>
                        <div className="text-gray-400">{data.lastAccessed || "N/A"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
  
                    <button className="text-gray-400 hover:text-gray-300">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* STORAGE ANALYTICS WITH CHARTS */}
      <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Storage Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <div className="border border-gray-700 rounded-lg p-4 hover:border-blue-500">
            <h3 className="font-medium mb-2 text-white">Storage Distribution</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={storageData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  label
                  isAnimationActive={true}
                >
                  {storageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="border border-gray-700 rounded-lg p-4 hover:border-blue-500">
            <h3 className="font-medium mb-2 text-white">File Types</h3>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={fileTypesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="documents" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="images" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="docs" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Recent Activity */}
          <div className="border border-gray-700 rounded-lg p-4 hover:border-blue-500">
            <h3 className="font-medium mb-2 text-white">Recent Activity</h3>
            <div style={{ width: "100%", height: 150 }}>
              <ResponsiveContainer>
                <BarChart
                  data={activityChartData}
                  margin={{ top: 10, right: 0, left: -15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="user" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <ul className="space-y-2 mt-4">
              {userActivity.slice(0, 3).map((activity) => (
                <li key={activity.id} className="text-sm text-gray-400 hover:text-blue-400">
                  {activity.user} {activity.action} {activity.file}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;
