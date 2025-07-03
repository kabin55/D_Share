import { Outlet } from 'react-router-dom';
import DashNav from '../../components/DashNav'
import Sidebar from '../../components/AdminDashboard/sidebar';
import Header from '../../components/AdminDashboard/Header';

const AdminLayout = () => {
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