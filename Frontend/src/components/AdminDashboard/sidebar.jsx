import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'dashboard', icon: '📊', path: '/admin/dashboard' },
    { name: 'files', icon: '📂', path: '/admin/files' },
    { name: 'users', icon: '👥', path: '/admin/users' },
    { name: 'performance', icon: '📈', path: '/admin/performance' },
    { name: 'settings', icon: '⚙️', path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-gray-800 p-4 shadow-lg border-r border-gray-700">
      <div className="flex items-center mb-8 p-2">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
          D-Share
        </h2>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `p-3 rounded-lg flex items-center space-x-3 cursor-pointer transition-all duration-200 hover:bg-gray-700 ${
                  isActive
                    ? 'bg-gray-700 font-semibold border-l-4 border-blue-500'
                    : ''
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="capitalize">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;