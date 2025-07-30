import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/DashNav";
import Sidebar from "../../components/Sidebar";
import FloatingBackground from "../../components/FloatingBackground";

export default function UserSettings() {
  const { walletAddress } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    if (user) {
      setUsername(user.username || "");
      setGender(user.gender || "");
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ walletAddress, username, gender }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem(
          "authUser",
          JSON.stringify({
            ...data,
          })
        );
        setSuccess(true);
        setMessage("✅ Profile updated successfully.");
      } else {
        setMessage(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative">
      <Navbar />
      <FloatingBackground />
      <div className="flex flex-1">
        <Sidebar active="Settings" />

        <main className="flex-1 flex justify-center items-center p-10">
          <div className="w-full max-w-lg space-y-8">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent text-center">
              Account Settings
            </h1>

            <div className="bg-[#1a1a1a]/90 rounded-2xl shadow-lg border border-[#2a2a2a] divide-y divide-[#333]">
              <form onSubmit={handleUpdate} className="p-6 space-y-6">
                {message && (
                  <div
                    className={`text-sm p-2 rounded-md ${
                      success ? "text-green-400" : "text-red-500"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wide text-gray-400">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#111] text-white placeholder-gray-500 px-4 py-2 rounded-lg border border-[#444] focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wide text-gray-400">
                    Gender
                  </label>
                  <div className="flex gap-4">
                    {["male", "female", "Other"].map((g) => (
                      <label
                        key={g}
                        className="flex items-center gap-2 capitalize cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={gender === g}
                          onChange={(e) => setGender(e.target.value)}
                          className="accent-cyan-500"
                        />
                        <span className="text-sm text-gray-300">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wide text-gray-400">
                    Wallet Address
                  </label>
                  <input
                    type="text"
                    value={walletAddress}
                    disabled
                    className="w-full bg-[#222] text-gray-400 px-4 py-2 rounded-lg border border-[#444]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold py-2 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md"
                >
                  Save Changes
                </button>
              </form>

              <div className="p-6 flex justify-center">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-xl transition-all"
                >
                  🔒 Logout & Clear Data
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
