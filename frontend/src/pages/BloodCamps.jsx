import { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Edit2, Trash2, Calendar, X } from 'lucide-react';

const BloodCamps = () => {
  const [bloodCamps, setBloodCamps] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);
  const [selectedCampAppointments, setSelectedCampAppointments] = useState([]);
  const [formData, setFormData] = useState({ name: '', location: '', date: '', time: '', hospitalId: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBloodCamps();
    fetchHospitals();
  }, []);

  const fetchBloodCamps = async () => {
    try {
      const response = await api.get('/bloodcamps');
      setBloodCamps(response.data);
    } catch (error) {
      console.error('Error fetching blood camps:', error);
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await api.get('/hospitals');
      setHospitals(response.data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/bloodcamps/${editId}`, formData);
      } else {
        await api.post('/bloodcamps', formData);
      }
      setShowModal(false);
      setFormData({ name: '', location: '', date: '', time: '', hospitalId: '' });
      setEditId(null);
      fetchBloodCamps();
    } catch (error) {
      console.error('Error saving blood camp:', error);
    }
  };

  const handleEdit = (camp) => {
    setFormData({
      name: camp.name,
      location: camp.location,
      date: new Date(camp.date).toISOString().split('T')[0],
      time: camp.time,
      hospitalId: camp.hospitalId || ''
    });
    setEditId(camp._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blood camp?')) {
      try {
        await api.delete(`/bloodcamps/${id}`);
        fetchBloodCamps();
      } catch (error) {
        console.error('Error deleting blood camp:', error);
      }
    }
  };

  const handleViewAppointments = async (campId) => {
    try {
      const response = await api.get('/appointments');
      const campAppointments = response.data.filter(apt => apt.bloodCampId?._id === campId);
      setSelectedCampAppointments(campAppointments);
      setShowAppointmentsModal(true);
    } catch (error) {
      console.error('Error fetching appointments for camp:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Blood Camps</h2>
        <button
          onClick={() => { setEditId(null); setFormData({ name: '', location: '', date: '', time: '', hospitalId: '' }); setShowModal(true); }}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" /> Add Blood Camp
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Camp Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bloodCamps.map((camp) => (
              <tr key={camp._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{camp.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{camp.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(camp.date).toLocaleDateString()} at {camp.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleViewAppointments(camp._id)} className="text-purple-600 hover:text-purple-900 mr-4" title="View Appointments">
                    <Calendar className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleEdit(camp)} className="text-indigo-600 hover:text-indigo-900 mr-4" title="Edit">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(camp._id)} className="text-red-600 hover:text-red-900" title="Delete">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {bloodCamps.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No blood camps created yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Camp Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{editId ? 'Edit Blood Camp' : 'Add New Blood Camp'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required type="text" placeholder="Camp Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500" />
                <select required value={formData.hospitalId} onChange={e => setFormData({...formData, hospitalId: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 bg-white">
                  <option value="">Select Target Hospital</option>
                  {hospitals.map(h => (
                    <option key={h._id} value={h._id}>{h.hospitalName}</option>
                  ))}
                </select>
                <input required type="text" placeholder="Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500" />
                <input required type="date" min={new Date().toISOString().split('T')[0]} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500" />
                <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500" />
                <div className="flex justify-end space-x-3 mt-6">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Appointments Modal */}
      {showAppointmentsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Camp Appointments</h3>
              <button onClick={() => setShowAppointmentsModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {selectedCampAppointments.length > 0 ? (
                <div className="bg-white border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blood Group</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedCampAppointments.map((apt) => (
                        <tr key={apt._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{apt.donorId?.name || apt.applicantName}</div>
                            <div className="text-xs text-gray-500">NIC: {apt.donorId?.nic || apt.nic}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apt.contactNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              {apt.donorId?.bloodGroup || apt.bloodGroup}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              apt.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                              apt.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {apt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No appointments have been booked for this camp yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodCamps;
