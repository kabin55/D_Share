import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'dashboard', path: '/admin/dashboard' },
    { name: 'files', path: '/admin/files' },
    { name: 'users',  path: '/admin/users' },
    { name: 'performance', path: '/admin/performance' },
    { name: 'settings',  path: '/admin/settings' },
  ];

  return (
    <aside className="w-56 bg-gray-900 border-r border-gray-700 p-6 flex flex-col space-y-6 min-h-screen">
      <div className="flex flex-col space-y-4">
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