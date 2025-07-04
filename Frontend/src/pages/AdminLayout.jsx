import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-900">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;