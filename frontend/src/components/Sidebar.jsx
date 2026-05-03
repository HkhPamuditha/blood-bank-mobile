import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Activity, Droplet, Building2, Calendar, ShieldCheck, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

 

  if (user && user.role === 'SuperAdmin') {
    navItems.push({ name: 'Admins', path: '/admins', icon: ShieldCheck });
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-red-700 text-white shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-red-600">
          <div className="flex items-center">
            <Droplet className="h-8 w-8 mr-2 text-red-100" />
            <span className="text-xl font-bold tracking-wider">LifeDrops</span>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 mt-6 overflow-y-auto">
          <ul>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
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
    </>
  );
};

export default Sidebar;
