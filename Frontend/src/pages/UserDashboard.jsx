import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut, FiBell, FiSettings, FiUpload, FiDownload, FiClock, FiFile } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { walletAddress } = location.state || {};

  const handleLogout = () => {
    navigate('/');
  };

  const handleNotifications = () => {
    alert('Notifications clicked!');
  };

  const handleSettings = () => {
    alert('Settings clicked!');
  };

  return (
    <div style={styles.container}>
      {/* Top Navigation Bar with rounded corners */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.profileInfo}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrmvSoqEMvs4E-TIgyfMdztZYEdKav-zok1A&s"
              alt="User Avatar"
              style={styles.avatar}
            />
            <div>
              <h2 style={styles.username}>Welcome Back 👋</h2>
              <p style={styles.wallet}>Wallet ID: {walletAddress || "Not connected"}</p>
            </div>
          </div>
          <div style={styles.actions}>
            <button style={styles.iconBtn} onClick={handleNotifications}>
              <FiBell size={20} />
            </button>
            <button style={styles.iconBtn} onClick={handleSettings}>
              <FiSettings size={20} />
            </button>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              <FiLogOut size={20} style={{ marginRight: 8 }} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div style={styles.mainWrapper}>
        <div style={styles.mainContent}>
          {/* Sidebar */}
          <div style={styles.sidebar}>
            <nav style={styles.sidebarNav}>
              <div style={styles.sidebarLink}>
                <FiFile style={styles.sidebarIcon} />
                My Files
              </div>
              <div style={styles.sidebarLink}>
                <FiUpload style={styles.sidebarIcon} />
                Upload Files
              </div>
              <div style={styles.sidebarLink}>
                <FiDownload style={styles.sidebarIcon} />
                Download Files
              </div>
              <div style={styles.sidebarLink}>
                <FiClock style={styles.sidebarIcon} />
                View History
              </div>
              <div style={styles.sidebarLink}>
                <FiSettings style={styles.sidebarIcon} />
                Settings
              </div>
            </nav>
          </div>

          {/* Main Content Area */}
          <div style={styles.contentArea}>
            <h3 style={styles.contentTitle}>Your Dashboard</h3>
            <p style={styles.contentSubtitle}>This is your secure space. Use DShare features like upload, download, and manage files.</p>
            
            <div style={styles.cardGrid}>
              <Sidebar/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px', // Added container padding for better spacing
  },
  header: {
    backgroundColor: '#1e293b',
    color: '#fff',
    borderRadius: '12px', // Rounded corners for top bar
    marginBottom: '12px', // Space between header and main content
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Added shadow for depth
  },
  headerContent: {
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainWrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#f1f5f9',
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    height: 'calc(100vh - 148px)', // Adjusted for header height + paddings
    gap: '20px', // Space between sidebar and content
  },
  profileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: '50%',
  },
  username: {
    margin: 0,
    fontSize: 18,
  },
  wallet: {
    margin: 0,
    fontSize: 14,
    color: '#94a3b8',
    wordBreak: 'break-all',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    padding: 8,
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  logoutBtn: {
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#dc2626',
    },
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#1e293b',
    padding: '24px 0',
    borderRadius: '12px',
    height: '100%',
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  sidebarLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 24px',
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#334155',
    },
  },
  sidebarIcon: {
    fontSize: 18,
    color: '#94a3b8',
  },
  contentArea: {
    flex: 1,
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflowY: 'auto',
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: '#1e293b',
    margin: '0 0 8px 0',
  },
  contentSubtitle: {
    fontSize: 14,
    color: '#64748b',
    margin: '0 0 24px 0',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    cursor: 'pointer',
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'translateY(-2px)',
    },
  },
};

export default UserDashboard;