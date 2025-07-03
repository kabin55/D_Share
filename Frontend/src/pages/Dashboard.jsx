import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/DashNav";
import Sidebar from "../components/Sidebar";
import FloatingBackground from "../components/FloatingBackground";

export default function Dashboard() {
  const { walletAddress } = useContext(AuthContext);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [gender, setGender] = useState(localStorage.getItem("gender") || "");
  const [tempUsername, setTempUsername] = useState("");
  const [showForm, setShowForm] = useState(!username && walletAddress);
  const [message, setMessage] = useState("");

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    if (!tempUsername.trim()) {
      setMessage("Please enter your username.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/users/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: tempUsername, walletAddress, gender }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("username", tempUsername);
        localStorage.setItem("gender", gender);
        setUsername(tempUsername);
        setShowForm(false);
        setMessage("User saved successfully!");
      } else {
        setMessage(result.message || "Failed to save user.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans relative">
      <Navbar />
      <FloatingBackground />

      <div className="flex flex-1">
        <Sidebar active="Dashboard" />

        <main className="flex-1 p-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Wallet Info Card */}
            <div className="flex-1 bg-[#1e1e1e]/80 p-6 rounded-3xl shadow-2xl backdrop-blur-md border border-[#2a2a2a] space-y-4">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Welcome to Your Dashboard
              </h1>

              <div className="space-y-2">
                <p className="text-sm text-gray-400">Wallet Address:</p>
                <p className="text-base text-white bg-[#111] p-2 rounded-xl border border-[#333] break-all">
                  {walletAddress || "Not connected"}
                </p>

                <p className="text-sm text-gray-400">Username:</p>
                <p className="text-base text-white bg-[#111] p-2 rounded-xl border border-[#333] break-all">
                  {username || "Not set"}
                </p>

                <p className="text-sm text-gray-400">Gender:</p>
                <p className="text-base text-white bg-[#111] p-2 rounded-xl border border-[#333] break-all">
                  {gender || "Not specified"}
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="w-full lg:w-80 bg-[#1e1e1e]/80 p-6 rounded-2xl shadow-xl border border-[#2b2b2b] backdrop-blur-lg overflow-y-auto space-y-4">
              <h2 className="text-xl font-bold text-cyan-400 mb-2">Recent Activity</h2>
              <ul className="space-y-3">
                <li className="bg-[#111] p-3 rounded-xl border border-[#333] hover:border-cyan-500 transition-all">
                  <p className="text-sm text-gray-300">Logged in using MetaMask</p>
                  <p className="text-xs text-cyan-500 mt-1">~ Just now</p>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>

      {/* Profile Completion Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <form
            onSubmit={handleUserSubmit}
            className="bg-[#1a1a1a] text-white p-8 rounded-xl border border-gray-700 w-full max-w-md shadow-lg space-y-4"
          >
            <h2 className="text-2xl font-bold text-cyan-400">Complete Your Profile</h2>

            {message && <p className="text-red-500 text-sm">{message}</p>}

            {/* Username */}
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring focus:ring-cyan-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm mb-1">Gender</label>
              <div className="flex gap-6 mt-1">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                    className="accent-cyan-500"
                    required
                  />
                  <span>male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                    className="accent-pink-500"
                  />
                  <span>female</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    onChange={(e) => setGender(e.target.value)}
                    className="accent-purple-500"
                  />
                  <span>Other</span>
                </label>
              </div>
            </div>

            {/* Wallet Address */}
            <div>
              <label className="block text-sm mb-1">Wallet Address</label>
              <input
                type="text"
                value={walletAddress}
                disabled
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-400 border border-gray-600"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-md"
            >
              Save & Continue
            </button>
          </form>
        </div>
      )}
      console.log(username)
    </div>
  );
}
