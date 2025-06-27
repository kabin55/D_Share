// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginWithMetaMask from './pages/LoginWithMetaMask'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import UploadPage from './pages/Upload'
import DownloadPage from './pages/Download'
import FileDetailPage from './pages/FileDetailPage'
import ChatHome from './pages/chat_home/ChatHome'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginWithMetaMask />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/download/:id" element={<FileDetailPage />} />
        <Route path="/chat" element={<ChatHome />} />
      </Routes>
    </Router>
  )
}

export default App
