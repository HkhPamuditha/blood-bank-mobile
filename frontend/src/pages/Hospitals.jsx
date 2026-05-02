import { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ hospitalName: '', location: '', contactNumber: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchHospitals();
  }, []);

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
        await api.put(`/hospitals/${editId}`, formData);
      } else {
        await api.post('/hospitals', formData);
      }
      setShowModal(false);
      setFormData({ hospitalName: '', location: '', contactNumber: '' });
      setEditId(null);
      fetchHospitals();
    } catch (error) {
      console.error('Error saving hospital:', error);
    }
  };

  const handleEdit = (hospital) => {
    setFormData(hospital);
    setEditId(hospital._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      try {
        await api.delete(`/hospitals/${id}`);
        fetchHospitals();
      } catch (error) {
        console.error('Error deleting hospital:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Hospital Management</h2>
        <button
          onClick={() => { setEditId(null); setFormData({ hospitalName: '', location: '', contactNumber: '' }); setShowModal(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="h-5 w-5 mr-2" /> Add Hospital
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hospitals.map((hospital) => (
              <tr key={hospital._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {hospital.hospitalName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hospital.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hospital.contactNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(hospital)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(hospital._id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
       
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hospitals;
