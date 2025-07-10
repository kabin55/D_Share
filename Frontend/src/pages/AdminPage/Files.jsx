import { useState, useEffect } from 'react'
import {
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
} from 'recharts'

import { FILE_TYPE_ICONS } from "../../Data/Constants";

const Files = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All Types");
  const [chartData, setChartData] = useState([]);
  const [activityChartData, setActivityChartData] = useState([]);
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/allfiles`);
        const data = await res.json();
        console.log("Fetched files:", data);
        setFileList(data);

        // Prepare file type per day data
        const dayWiseFileStats = {
          Mon: { documents: 0, images: 0, docs: 0 },
          Tue: { documents: 0, images: 0, docs: 0 },
          Wed: { documents: 0, images: 0, docs: 0 },
          Thu: { documents: 0, images: 0, docs: 0 },
          Fri: { documents: 0, images: 0, docs: 0 },
          Sat: { documents: 0, images: 0, docs: 0 },
          Sun: { documents: 0, images: 0, docs: 0 },
        };

        const uploadCounts = {};

        data.forEach((file) => {
          const day = new Date(file.createdAt).toLocaleDateString("en-US", {
            weekday: "short",
          });

          if (!dayWiseFileStats[day]) {
            dayWiseFileStats[day] = { documents: 0, images: 0, docs: 0 };
          }

          const type = file.type?.toLowerCase() || "";

          if (type.includes("pdf")) {
            dayWiseFileStats[day].documents += 1;
          } else if (type.includes("image")) {
            dayWiseFileStats[day].images += 1;
          } else {
            dayWiseFileStats[day].docs += 1;
          }

          const username = file.username || "Unknown";
          uploadCounts[username] = (uploadCounts[username] || 0) + 1;
        });

        // Line chart
        const generatedChartData = Object.entries(dayWiseFileStats).map(
          ([day, counts]) => ({
            day,
            ...counts,
          })
        );
        setChartData(generatedChartData);

        // Bar chart
        const uploadChartData = Object.entries(uploadCounts).map(
          ([user, count]) => ({
            user,
            count,
          })
        );
        setActivityChartData(uploadChartData);

        // Recent activity list (5 most recent)
        const recentActivity = [...data]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          .map((file, index) => ({
            id: index,
            user: file.username || "Unknown",
            file: file.filename || "Unnamed file",
          }));
        setActivityList(recentActivity);
      } catch (err) {
        console.error('Error fetching files:', err)
      } finally {
        setLoading(false)
      }
    };

    fetchFiles();
  }, []);

 const filteredFiles = fileList.filter((data) => {
  const matchesSearch =
    data.filename?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.username?.toLowerCase().includes(searchQuery.toLowerCase());

  const type = data.type?.toLowerCase() || "";

  const matchesType =
    selectedType === "All Types" ||
    (selectedType === "Documents" && type.includes("pdf")) ||
    (selectedType === "Images" && type.includes("image")) ||
    (selectedType === "Videos" && type.includes("video"));

  return matchesSearch && matchesType;
});

  const getFileTypeIcon = (type) => FILE_TYPE_ICONS[type] || FILE_TYPE_ICONS.default;

  return (
    <div className="space-y-6">
      {/* FILE MANAGEMENT TABLE */}
      <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">
          File Management
        </h2>
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
        <select
  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 hover:border-blue-500 text-white"
  value={selectedType}
  onChange={(e) => setSelectedType(e.target.value)}
>
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
                      <span className="mr-3 text-lg">{getFileTypeIcon(data.type)}</span>
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
                        <div className="text-sm font-medium text-gray-300">Downloads</div>
                        <div className="text-blue-400">{data.downloads || 0}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-300">Views</div>
                        <div className="text-green-400">{data.views || 0}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-300">Last Access</div>
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
        <h2 className="text-xl font-semibold mb-4 text-white">
          Storage Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="border border-gray-700 rounded-lg p-4 hover:border-blue-500">
            <h3 className="font-medium mb-2 text-white">File Types</h3>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="documents"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="images"
                  stroke="#10b981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="docs"
                  stroke="#f59e0b"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Recent Activity */}
          <div className="border border-gray-700 rounded-lg p-4 hover:border-blue-500">
            <h3 className="font-medium mb-2 text-white">Recent Activity</h3>
            <div style={{ width: '100%', height: 150 }}>
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
              {activityList.map((activity) => (
                <li key={activity.id} className="text-sm text-gray-400 hover:text-blue-400">
                  <span className="text-white">{activity.user}</span> uploaded{" "}
                  <span className="text-blue-400">{activity.file}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Files
