import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Admin Portal</h1>
        <div className="flex items-center space-x-6">
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
