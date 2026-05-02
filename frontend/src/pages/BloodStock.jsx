import { useState, useEffect } from 'react';
import api from '../services/api';

const BloodStock = () => {
  // State to store blood stock data
  const [stock, setStock] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ hospitalId: '', bloodGroup: '', unitsAvailable: '' });

  useEffect(() => {
    fetchHospitals();
  }, []);

  useEffect(() => {
    if (selectedHospital) {
      fetchStock();
    } else {
      setStock([]);
    }
  }, [selectedHospital]);

  const fetchHospitals = async () => {
    try {
      const response = await api.get('/hospitals');
      setHospitals(response.data);
      if (response.data.length > 0) {
        setSelectedHospital(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  const fetchStock = async () => {
    try {
      const response = await api.get(`/bloodstock?hospitalId=${selectedHospital}`);
      setStock(response.data);
    } catch (error) {
      console.error('Error fetching blood stock:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.hospitalId) {
      alert("Please select a hospital");
      return;
    }
    try {
      await api.post('/bloodstock', formData);
      setShowModal(false);
      setFormData({ hospitalId: '', bloodGroup: '', unitsAvailable: '' });
      if (formData.hospitalId === selectedHospital) {
        fetchStock();
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Blood Stock Management</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 bg-white w-full sm:w-auto"
          >
            {hospitals.length === 0 && <option value="">No Hospitals Found</option>}
            {hospitals.map(hospital => (
              <option key={hospital._id} value={hospital._id}>{hospital.hospitalName}</option>
            ))}
          </select>
          <button
            onClick={() => { setFormData({ hospitalId: selectedHospital, bloodGroup: '', unitsAvailable: '' }); setShowModal(true); }}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors w-full sm:w-auto justify-center"
          >
            Update Stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => {
          const item = stock.find(s => s.bloodGroup === bg);
          const units = item ? item.unitsAvailable : 0;
          return (
            <div key={bg} className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center border-t-4 border-red-500">
              <span className="text-3xl font-bold text-red-600 mb-2">{bg}</span>
              <span className="text-gray-500 font-medium">{units} Units</span>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Update Blood Stock</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <select required value={formData.hospitalId} onChange={e => setFormData({ ...formData, hospitalId: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500">
                  <option value="">Select Hospital</option>
                  {hospitals.map(hospital => (
                    <option key={hospital._id} value={hospital._id}>{hospital.hospitalName}</option>
                  ))}
                </select>
                <select required value={formData.bloodGroup} onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500">
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <input required type="number" placeholder="Units Available" value={formData.unitsAvailable} onChange={e => setFormData({ ...formData, unitsAvailable: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500" />

                <div className="flex justify-end space-x-3 mt-6">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodStock;
