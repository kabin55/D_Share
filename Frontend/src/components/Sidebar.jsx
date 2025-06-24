import React from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [ 
  { name: "Dashboard", href: "/dashboard" },
  { name: "Upload", href: "/upload" },
  { name: "Download", href: "/download" },
  { name: "Chat", href: "/chat" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-56 bg-gray-900 border-r border-gray-700 p-6 flex flex-col space-y-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3">D-Share</h2>
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`block px-3 py-2 rounded hover:bg-gray-700 transition ${
              location.pathname === item.href ? "bg-white text-black font-semibold" : "text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
