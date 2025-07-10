import { useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy file list (replace with props or API in real app)
  const files = [
    "report.pdf",
    "invoice_2024.xlsx",
    "project_plan.docx",
    "performance_data.csv",
    "user_guide.txt",
  ];

  const filteredFiles = files.filter((file) =>
    file.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    switch (path) {
      case "dashboard":
        return "Dashboard Overview";
      case "files":
        return "File Management";
      case "users":
        return "User Management";
      case "performance":
        return "System Performance";
      case "settings":
        return "System Settings";
      default:
        return "Dashboard Overview";
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
        {getPageTitle()}
      </h1>
      <div className="relative w-full md:w-64">

      </div>

      {/* Show filtered results (for demo purposes) */}
      {searchQuery && (
        <div className="bg-gray-800 text-white p-4 rounded-lg w-full md:w-64 mt-4">
          <h2 className="font-semibold mb-2">Search Results:</h2>
          <ul className="list-disc list-inside text-sm">
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file, index) => <li key={index}>{file}</li>)
            ) : (
              <li>No files found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
