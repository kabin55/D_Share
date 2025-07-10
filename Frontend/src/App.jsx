// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/HomePage/Home'
import LoginWithMetaMask from './pages/LoginWithMetaMask'
import UploadPage from './pages/UserPage/Upload'
import DownloadPage from './pages/UserPage/Download'
import Dashboard from './pages/UserPage/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import FileDetailPage from './pages/UserPage/FileDetailPage'
import FloatingBackground from './components/FloatingBackground'
import ChatBubble from './ChatBubble'
import Chat from './pages/ChatLayout'
// import SettingsPage from './pages/UserPage/Settings'

// Admin section from AdminPages/
import AdminLayout from './pages/AdminPage/AdminLayout'
import AdminDashboard from './pages/AdminPage/Dashboard'
import Files from './pages/AdminPage/Files'
import Users from './pages/AdminPage/Users'
import Performance from './pages/AdminPage/Performance'
// import Settings from './pages/AdminPage/Setting';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <FloatingBackground />
        <ChatBubble /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginWithMetaMask />} />

          {/* ✅ Protect these routes */}
          <Route
            path="/userdashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/download"
            element={
              <ProtectedRoute>
                <DownloadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/file/:id"
            element={
              <ProtectedRoute>
                <FileDetailPage />
              </ProtectedRoute>
            }
          />
          {/* ✅ Admin Layout with Nested Routes (Protected if needed) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="files" element={<Files />} />
            <Route path="users" element={<Users />} />
            <Route path="performance" element={<Performance />} />
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
