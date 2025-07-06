import { Outlet } from 'react-router-dom';
import DashNav from '../../components/DashNav'
import Sidebar from '../../components/AdminDashboard/sidebar';
import Header from '../../components/AdminDashboard/Header';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminLayout = () => {
  const { walletAddress } = useContext(AuthContext);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!walletAddress) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/check`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ walletAddress }),
        });

        const data = await res.json();
        if (res.ok && data?.username) {
          localStorage.setItem(
            'authUser',
            JSON.stringify({
              _id: data._id,
              username: data.username,
              gender: data.gender,
              walletAddress: data.walletAddress,
              profilePic: data.profilePic,
            })
          );
          localStorage.setItem('profilePic', data.profilePic);
        }
      } catch (error) {
        console.error('Admin check error:', error);
      }
    };

    checkAdmin();
  }, [walletAddress]);

  return (
    // <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans relative">
            <DashNav />
      <div className="flex flex-1">
              <Sidebar />
      <main className="flex-1 p-10">
        <Header />
        <Outlet />
      </main>
    </div>
    </div>
  );
};

export default AdminLayout;