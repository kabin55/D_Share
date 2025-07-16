import React, { useEffect, useState } from "react";
import { FILE_TYPE_ICONS } from "../../Data/Constants"; // Your icon mapping

const RecentFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch recent files from backend API
  const fetchRecentFiles = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/recent-files`
      );
      if (!response.ok) throw new Error("Failed to fetch recent files");
      const data = await response.json();
      setFiles(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recent files:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentFiles();

    // Poll every 10 seconds for real-time updates
    const interval = setInterval(() => {
      fetchRecentFiles();
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Helper to get icon based on file type
  const getFileTypeIcon = (type) => {
    return FILE_TYPE_ICONS[type] || FILE_TYPE_ICONS.default;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Recent Files</h2>

      {loading ? (
        <p className="text-gray-400">Loading files...</p>
      ) : files.length === 0 ? (
        <p className="text-gray-400">No recent files found.</p>
      ) : (
        <ul className="divide-y divide-gray-700 max-h-96 overflow-auto">
          {files.map((file) => (
            <li
              key={file._id || file.filename} // Use _id or filename as key
              className="py-3 hover:bg-gray-700 transition-colors duration-200 px-2 rounded cursor-pointer flex items-center space-x-4"
            >
              <div className="flex-shrink-0 bg-blue-500 bg-opacity-20 p-2 rounded-full">
                <span className="text-blue-400 text-xl">
                  {getFileTypeIcon(file.type)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {file.filename}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  Shared by: {file.username || "Unknown"}
                </p>
              </div>
              <div className="whitespace-nowrap text-gray-400 text-xs">
                {new Date(file.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentFiles;
