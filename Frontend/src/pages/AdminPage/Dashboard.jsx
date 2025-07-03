import { useState } from "react";
import StatsCard from "../../components/AdminDashboard/StatsCard";
import IPFSStatus from "../../components/AdminDashboard/IPFSStatus";
import PopularityGraph from "../../components/AdminDashboard/Popularitygraph";
import RecentActivity from "../../components/AdminDashboard/RecentActivity";
import RecentFilesTable from "../../components/AdminDashboard/RecentFilesTable";
import {
  stats,
  ipfsStats,
  userActivity,
  recentFiles,
} from "../../Data/SampleData";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const filteredFiles = recentFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.sharedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundImage:
          "url('https://i.gifer.com/origin/46/462c6f5f67c13830cd9fcdbfc7b55ded.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 0,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 p-6 text-white">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(stats).map(([key, value]) => (
            <StatsCard key={key} title={key} value={value} />
          ))}
        </div>

        <IPFSStatus data={ipfsStats} />

        {/* Graph and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PopularityGraph darkMode={true} />
          <RecentActivity activities={userActivity} />
        </div>

        <RecentFilesTable
          files={filteredFiles}
          selectedFile={selectedFile}
          onSelectFile={setSelectedFile}
        />
      </div>
    </div>
  );
};

export default Dashboard;
