import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-3 p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Admin Portal</h1>
        </div>
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 p-2 rounded-full">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{user?.name || 'Guest'}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Role'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center text-gray-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-1" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
