import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', nic: '', age: '', gender: '', bloodGroup: '', contactNumber: '', address: '' });
  const [editId, setEditId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [dob, setDob] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchDonors();
  }, [searchTerm]);

  const fetchDonors = async () => {
    try {
      const url = searchTerm ? `/donors?nic=${searchTerm}` : '/donors';
      const response = await api.get(url);
      setDonors(response.data);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const handleDobChange = (e) => {
    const selectedDob = e.target.value;
    setDob(selectedDob);
    if (selectedDob) {
      const birthDate = new Date(selectedDob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setFormData((prev) => ({ ...prev, age: calculatedAge }));
    } else {
      setFormData((prev) => ({ ...prev, age: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/donors/${editId}`, formData);
      } else {
        await api.post('/donors', formData);
      }
      setShowModal(false);
      setFormData({ name: '', nic: '', age: '', gender: '', bloodGroup: '', contactNumber: '', address: '' });
      setEditId(null);
      setDob('');
      fetchDonors();
    } catch (error) {
      console.error('Error saving donor:', error);
    }
  };

  const handleEdit = (donor) => {
    setFormData(donor);
    setEditId(donor._id);
    setDob('');
    setShowModal(true);
  };

  const confirmDelete = async (id) => {
    try {
      await api.delete(`/donors/${id}`);
      setDeleteConfirmId(null);
      fetchDonors();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setDeleteConfirmId(null);
        fetchDonors();
      } else {
        console.error('Error deleting donor:', error);
        alert('Failed to delete donor.');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Donors Management</h2>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6 flex items-center">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search by NIC Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 outline-none text-gray-700"
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donors.map((donor) => (
              <tr key={donor._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                  <div className="text-xs text-gray-400">NIC: {donor.nic}</div>
                  <div className="text-sm text-gray-500">{donor.age} yrs, {donor.gender}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    {donor.bloodGroup}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {donor.contactNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(donor)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  {user && user.role === 'SuperAdmin' && (
                    <button onClick={() => setDeleteConfirmId(donor._id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {donors.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No donors found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{editId ? 'Edit Donor' : 'Add New Donor'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500" />
                <input required type="text" placeholder="NIC Number" value={formData.nic} onChange={e => setFormData({ ...formData, nic: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500" />
                <div className="flex space-x-2">
                  <input type="date" required={!formData.age} value={dob} onChange={handleDobChange} className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500" title="Date of Birth" />
                  <input required type="number" placeholder="Age" value={formData.age} readOnly className="w-1/3 px-3 py-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:border-red-500 cursor-not-allowed" title="Auto-calculated Age" />
                  <select required value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500">
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <select required value={formData.bloodGroup} onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500">
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                <input required type="text" placeholder="Contact Number" value={formData.contactNumber} onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500" />
                <input required type="text" placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500" />

                <div className="flex justify-end space-x-3 mt-6">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this donor? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
              <button onClick={() => confirmDelete(deleteConfirmId)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donors;
