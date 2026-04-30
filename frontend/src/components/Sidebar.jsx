import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Activity, Droplet, Building2, Calendar, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Donors', path: '/donors', icon: Users },
    { name: 'Blood Stock', path: '/bloodstock', icon: Droplet },
    { name: 'Hospitals', path: '/hospitals', icon: Building2 },
    { name: 'Blood Camps', path: '/bloodcamps', icon: Activity },
    { name: 'Appointments', path: '/appointments', icon: Calendar },
  ];

  if (user && user.role === 'SuperAdmin') {
    navItems.push({ name: 'Admins', path: '/admins', icon: ShieldCheck });
  }

  return (
    <div className="w-64 bg-red-700 text-white min-h-screen shadow-lg flex flex-col">
      <div className="p-6 flex items-center justify-center border-b border-red-600">
        <Droplet className="h-8 w-8 mr-2 text-red-100" />
        <span className="text-xl font-bold tracking-wider">LifeDrops</span>
      </div>
      <nav className="flex-1 mt-6">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-4 transition-colors duration-200 ${
                    isActive ? 'bg-red-800 border-l-4 border-white' : 'hover:bg-red-600 border-l-4 border-transparent'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 text-xs text-red-200 text-center">
        &copy; 2026 Blood Bank System
      </div>
    </div>
  );
};

export default Sidebar;
