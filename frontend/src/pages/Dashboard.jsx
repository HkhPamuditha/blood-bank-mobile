import { useState, useEffect } from 'react';
import api from '../services/api';
import { Users, Droplet, Calendar } from 'lucide-react';

const DashboardCard = ({ title, count, icon: Icon, color }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center">
    <div className={`p-4 rounded-full ${color} text-white mr-4`}>
      <Icon className="h-8 w-8" />
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{count}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    donors: 0,
    appointments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [donorsRes, apptRes] = await Promise.all([
          api.get('/donors'),
          api.get('/appointments'),
        ]);

        setStats({
          donors: donorsRes.data.length,
          appointments: apptRes.data.filter(apt => apt.status === 'Pending').length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Donors" count={stats.donors} icon={Users} color="bg-blue-500" />
        <DashboardCard title="New Appointments" count={stats.appointments} icon={Calendar} color="bg-purple-500" />
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h3>
        <p className="text-gray-500">Welcome to the Blood Bank Management System Dashboard. Use the sidebar to navigate through the modules.</p>
      </div>
    </div>
  );
};

export default Dashboard;
