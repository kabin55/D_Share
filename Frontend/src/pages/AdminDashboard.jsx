// AdminDashboard.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const location = useLocation();
  const { walletAddress } = location.state || {};

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Connected Wallet: {walletAddress}</p>
      {/* Your admin dashboard content here */}
    </div>
  );
};

export default AdminDashboard;