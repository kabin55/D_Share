// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import Home from './pages/Home';
import LoginWithMetaMask from './pages/LoginWithMetaMask';
import AdminDashboard from './pages/AdminDashboard'; 
import UploadPage from './pages/Upload';
import DownloadPage from "./pages/Download";
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';  
import FileDetailPage from "./pages/FileDetailPage";
import FloatingBackground from './components/FloatingBackground';
import ChatBubble from './ChatBubble'


const App = () => {
  return (
    <AuthProvider>
      <Router>
         <FloatingBackground />
         <ChatBubble />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginWithMetaMask />} />

          {/* ✅ Protect these routes */}
          <Route path="/userdashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/admin-dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/upload" element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          } />

          <Route path="/download" element={
            <ProtectedRoute>
              <DownloadPage />
            </ProtectedRoute>
          } />
          <Route path="/file/:id" element={
            <ProtectedRoute>
              <FileDetailPage />
              </ProtectedRoute>
            } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
