import React, { useContext } from "react";
import { FiLogOut, FiBell, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { walletAddress, logout } = useContext(AuthContext); // ⬅️ get logout

  const handleLogout = () => {
    logout(); // ⬅️ clear context and localStorage
    navigate("/"); // ⬅️ redirect to home/login
  };

  return (
    <header className="bg-gray-900 text-white rounded-xl shadow-md mb-3 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={users?.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrmvSoqEMvs4E-TIgyfMdztZYEdKav-zok1A&s"}
          alt="User Avatar"
          className="w-14 h-14 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">Welcome Back 👋</h2>
          <p className="text-sm text-gray-400 break-all">
            Wallet ID: {walletAddress || "Not connected"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="hover:bg-white/10 p-2 rounded-full">
          <FiBell />
        </button>
        <button className="hover:bg-white/10 p-2 rounded-full">
          <FiSettings />
        </button>
        <button
          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={handleLogout}
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
}
