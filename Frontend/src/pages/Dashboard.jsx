// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { walletInfo } = useContext(AuthContext);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p><strong>Wallet Address:</strong> {walletInfo?.address}</p>
      <p><strong>Signature:</strong> {walletInfo?.signature}</p>

      
    </div>
  );
};

export default Dashboard;
