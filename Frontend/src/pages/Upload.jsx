import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import FloatingBackground from "../components/FloatingBackground";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [privacy, setPrivacy] = useState("public");
  const [filename, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const inputRef = useRef(null);

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }

  function handleChange(e) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }

  function handleBrowseClick() {
    inputRef.current.click();
  }

  const fetchUploadedFiles = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/files");
      const data = await res.json();
      setUploadedFiles(data);
    } catch (err) {
      console.error("Error fetching uploaded files", err);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  async function handleUpload() {
    if (!selectedFile || !filename || !description) {
      alert("Please fill all fields and select a file.");
      return;
    }

    // Start scanning animation
    setIsScanning(true);

    // Simulate scanning delay (5 seconds)
    setTimeout(async () => {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("filename", filename);
        formData.append("description", description);
        formData.append("privacy", privacy);

        const res = await fetch("http://localhost:4000/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          alert(`Uploaded to IPFS! Hash: ${data.ipfsHash}`);
          setSelectedFile(null);
          setFilename("");
          setDescription("");
          fetchUploadedFiles();
        } else {
          alert("Upload failed");
        }
      } catch (err) {
        console.error(err);
        alert("Error uploading file");
      } finally {
        setIsScanning(false);
      }
    }, 5000);
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#141414] text-white font-inter relative overflow-hidden">
      <FloatingBackground />
      <Sidebar active="Upload" />

      <main
        className="flex-1 p-6 md:p-12 flex flex-col md:flex-row gap-8 z-10 relative"
        style={{ minHeight: "calc(100vh - 48px)" }}
      >
        {/* Upload Form */}
        <div
          className="w-full max-w-3xl space-y-4 bg-[#1e1e1e]/80 p-6 rounded-3xl shadow-2xl backdrop-blur-md border border-[#2a2a2a] relative"
          style={{ maxHeight: "70vh" }}
        >
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Upload to D-Share
          </h1>

          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-300">
              Filename
            </label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full p-2 bg-[#111] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
              placeholder="Enter filename"
              disabled={isScanning}
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-semibold text-gray-300">
              File Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-[#111] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Write a short description about the file"
              rows="2"
              style={{ resize: "none" }}
              disabled={isScanning}
            ></textarea>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-gray-300">
            {["public", "private", "shared"].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="privacy"
                  value={option}
                  checked={privacy === option}
                  onChange={() => setPrivacy(option)}
                  className={`form-radio h-3 w-3 ${
                    option === "public"
                      ? "text-cyan-500"
                      : option === "private"
                      ? "text-pink-500"
                      : "text-indigo-400"
                  }`}
                  disabled={isScanning}
                />
                <span className="capitalize">{option}</span>
              </label>
            ))}
          </div>

          {/* Drag and Drop Upload */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
            className={`w-full h-40 border-4 border-dashed rounded-xl flex flex-col justify-center items-center transition-all duration-300 cursor-pointer relative ${
              dragActive
                ? "border-cyan-500 bg-[#222]/60"
                : "border-[#444] bg-[#1a1a1a]/40 hover:border-cyan-500"
            } ${isScanning ? "cursor-not-allowed opacity-70" : ""}`}
          >
            {selectedFile ? (
              <p className="text-center text-base font-medium animate-pulse truncate max-w-full">
                {selectedFile.name}
              </p>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-2 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16v4m0 0h10m-10 0l5-5m0-9v9m0 0l5-5m-5 5L7 7"
                  />
                </svg>
                <p className="text-gray-400 text-center text-sm">
                  Drag & Drop your file here
                </p>
                <span className="mt-1 text-xs bg-cyan-500 text-black px-2 py-0.5 rounded-lg font-medium">
                  Browse File
                </span>
              </>
            )}
            <input
              type="file"
              ref={inputRef}
              className="hidden"
              onChange={handleChange}
              disabled={isScanning}
            />

            {/* Scanning Animation Overlay */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                {/* Horizontal scanning blue line */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-blue-400/80 to-transparent animate-scan-horizontal"></div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleUpload}
              disabled={isScanning}
              className="mt-4 px-8 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload
            </button>
          </div>
        </div>

        {/* Sidebar: Uploaded Files */}
        <div
          className="w-full md:w-80 bg-[#1e1e1e]/80 p-6 rounded-2xl shadow-xl border border-[#2b2b2b] backdrop-blur-lg overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 96px)" }}
        >
          <h2 className="text-xl font-bold mb-4 text-cyan-400">Uploaded Files</h2>
          <ul className="space-y-4">
            {uploadedFiles.map((file) => (
              <li
                key={file._id}
                className="p-3 bg-[#111] rounded-xl border border-[#333] hover:border-cyan-500 transition-all"
              >
                <p className="font-semibold truncate text-white">{file.filename}</p>
                <p className="text-sm text-gray-400 truncate">{file.description}</p>
                <span className="text-xs text-cyan-500 capitalize">
                  {file.privacy}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Animation Styles */}
      <style>{`
        @keyframes scan-horizontal {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .animate-scan-horizontal {
          animation: scan-horizontal 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
