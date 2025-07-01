// AdminDashboard.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from 'react-router-dom';
import DashNav from '../components/DashNav'

const AdminDashboard = () => {
  const location = useLocation();
  const { walletAddress } = useContext(AuthContext);

  return (
    <div>
      <DashNav/>
      
    </div>
  );
};

export default AdminDashboard;