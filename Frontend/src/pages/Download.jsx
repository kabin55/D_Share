import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import FileCard from "../components/FileCard";
import Navbar from "../components/DashNav";
import { AuthContext } from "../context/AuthContext";

export default function DownloadPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState([]);
  const { walletInfo } = useContext(AuthContext);

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

  const filteredFiles = files.filter((file) =>
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans">
      <Navbar walletAddress={walletInfo?.address || "Not connected"} />

      <div className="flex flex-1">
        <Sidebar active="Download" />

        <main className="flex-1 p-10">
          <h2 className="text-4xl font-extrabold mb-8 text-cyan-400 drop-shadow-lg">
            Download Files
          </h2>

          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/2 p-3 rounded-xl bg-gray-900 bg-opacity-50 border-2 border-gray-700 placeholder-cyan-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition shadow-lg"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredFiles.map((file) => (
              <FileCard key={file._id || file.id} file={file} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
