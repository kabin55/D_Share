// src/context/AuthContext.jsx
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress") || ""
  );

  const login = (address) => {
    setWalletAddress(address);
    localStorage.setItem("walletAddress", address);
  };

  const logout = () => {
    setWalletAddress("");
    localStorage.removeItem("walletAddress");
  };

  return (
    <AuthContext.Provider value={{ walletAddress, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
