import { useState, useEffect } from 'react';
import api from '../services/api';
import { CheckCircle, XCircle, Trash2, Search } from 'lucide-react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments');
      // Filter to only show Pending appointments
      const pendingAppointments = response.data.filter(apt => apt.status === 'Pending');
      setAppointments(pendingAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/appointments/${id}`, { status: newStatus });
      fetchAppointments();
    } catch (error) {
      console.error(`Error updating appointment to ${newStatus}:`, error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await api.delete(`/appointments/${id}`);
        fetchAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const nic = apt.donorId?.nic || apt.nic || '';
    return nic.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6 flex items-center">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search by NIC number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 outline-none text-gray-700"
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant / Donor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location (Camp/Hospital)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.map((apt) => (
              <tr key={apt._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(apt.appointmentDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{apt.donorId?.name || apt.applicantName}</div>
                  <div className="text-xs text-gray-400">NIC: {apt.donorId?.nic || apt.nic}</div>
                  <div className="text-sm text-gray-500">Blood: {apt.donorId?.bloodGroup || apt.bloodGroup}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {apt.bloodCampId ? apt.bloodCampId.name : apt.hospitalId?.hospitalName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {apt.bloodCampId ? `Camp: ${apt.bloodCampId.location}` : `Hospital: ${apt.hospitalId?.location}`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${apt.status === 'Approved' || apt.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      apt.status === 'Rejected' || apt.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                    {apt.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {apt.status === 'Pending' && (
                    <>
                      <button onClick={() => handleStatusChange(apt._id, 'Approved')} className="text-green-600 hover:text-green-900 mr-3" title="Approve">
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleStatusChange(apt._id, 'Rejected')} className="text-orange-600 hover:text-orange-900 mr-3" title="Reject">
                        <XCircle className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  <button onClick={() => handleDelete(apt._id)} className="text-red-600 hover:text-red-900" title="Delete">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredAppointments.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
