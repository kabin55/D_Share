import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import FileCard from "../components/FileCard";

export default function DownloadPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/public-files");
        const data = await res.json();
        setFiles(data);
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };
    fetchFiles();
  }, []);

  // Filter files based on search term
  const filteredFiles = files.filter((file) =>
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen font-sans">
      <Sidebar active="Download" />
      <div className="flex-1 p-10">
        <h2 className="text-4xl font-extrabold mb-8 text-cyan-400 drop-shadow-lg">
          Download Files
        </h2>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-1/2 p-3 rounded-xl 
              bg-gray-900 bg-opacity-50 
              border-2 border-gray-700 
              placeholder-cyan-500 
              text-white
              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent
              transition
              shadow-lg
            "
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredFiles.map((file) => (
            <FileCard key={file._id || file.id} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
}
