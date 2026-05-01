import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Heart, Activity, ShieldCheck, X, Calendar } from 'lucide-react';
import api from '../services/api';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCampsModal, setShowCampsModal] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [bloodCamps, setBloodCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [dob, setDob] = useState('');
  const [formData, setFormData] = useState({
    applicantName: '',
    nic: '',
    age: '',
    gender: '',
    bloodGroup: '',
    contactNumber: '',
    address: '',
    hospitalId: '',
    bloodCampId: '',
    appointmentDate: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (showModal && !selectedCamp) {
      const fetchHospitals = async () => {
        try {
          const res = await api.get('/hospitals');
          setHospitals(res.data);
        } catch (error) {
          console.error('Error fetching hospitals:', error);
        }
      };
      fetchHospitals();
    }
  }, [showModal, selectedCamp]);

  useEffect(() => {
    if (showCampsModal) {
      const fetchCamps = async () => {
        try {
          const res = await api.get('/bloodcamps');
          setBloodCamps(res.data);
        } catch (error) {
          console.error('Error fetching blood camps:', error);
        }
      };
      fetchCamps();
    }
  }, [showCampsModal]);

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

  const handleOpenBooking = (camp = null) => {
    setSelectedCamp(camp);
    setFormData(prev => ({
      ...prev,
      hospitalId: '',
      bloodCampId: camp ? camp._id : '',
      appointmentDate: camp ? new Date(camp.date).toISOString().split('T')[0] : ''
    }));
    setShowCampsModal(false);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload.hospitalId) delete payload.hospitalId;
      if (!payload.bloodCampId) delete payload.bloodCampId;

      await api.post('/appointments', payload);
      setMessage('Appointment requested successfully! Awaiting admin approval.');
      setTimeout(() => {
        setShowModal(false);
        setMessage('');
        setFormData({ applicantName: '', nic: '', age: '', gender: '', bloodGroup: '', contactNumber: '', address: '', hospitalId: '', bloodCampId: '', appointmentDate: '' });
        setDob('');
        setSelectedCamp(null);
      }, 3000);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage('Error booking appointment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-red-100">
      {/* Navigation Bar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-red-50 p-2 rounded-xl">
                <Droplet className="h-8 w-8 text-red-600" />
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-900">LifeDrops</span>
            </div>

            {/* Right side - Login Button */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-full text-white bg-red-600 hover:bg-red-700 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-50 via-white to-white opacity-70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
            Every Drop <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Counts.</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 md:text-2xl leading-relaxed mb-10">
            Join our community of lifesavers. Manage donations, track blood stock, and schedule appointments effortlessly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowCampsModal(true)}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-white bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
            >
              View Blood Camps
            </button>
            <button
              onClick={() => handleOpenBooking()}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-white bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose LifeDrops?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              A comprehensive platform designed to streamline blood bank operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              <div className="bg-red-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Heart className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Save Lives</h3>
              <p className="text-gray-500 leading-relaxed">
                Connect donors with hospitals efficiently, ensuring blood is available when it's needed most.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              <div className="bg-red-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Activity className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Tracking</h3>
              <p className="text-gray-500 leading-relaxed">
                Monitor blood stock levels and manage inventory seamlessly to prevent shortages.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              <div className="bg-red-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure System</h3>
              <p className="text-gray-500 leading-relaxed">
                Robust authentication and role-based access control to keep medical records safe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blood Camps Modal */}
      {showCampsModal && (
        <div className="fixed inset-0 z-[100] bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Upcoming Blood Camps</h3>
              <button onClick={() => setShowCampsModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {bloodCamps.length > 0 ? (
                bloodCamps.map(camp => (
                  <div key={camp._id} className="border border-gray-100 bg-gray-50 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{camp.name}</h4>
                      <p className="text-gray-600 text-sm flex items-center mt-1">
                        <span className="mr-2">📍 {camp.location}</span>
                      </p>
                      <p className="text-gray-600 text-sm flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {new Date(camp.date).toLocaleDateString()} at {camp.time}
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenBooking(camp)}
                      className="px-5 py-2.5 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors shrink-0"
                    >
                      Book Here
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No upcoming blood camps at the moment.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Book an Appointment</h3>
              <button onClick={() => { setShowModal(false); setSelectedCamp(null); }} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {message && (
              <div className={`mb-4 p-3 rounded text-sm ${message.includes('Error') ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Full Name" value={formData.applicantName} onChange={e => setFormData({...formData, applicantName: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
              <input required type="text" placeholder="NIC Number" value={formData.nic} onChange={e => setFormData({...formData, nic: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
              
              <div className="flex space-x-3">
                <div className="w-1/2">
                  <label className="block text-xs text-gray-500 mb-1">Date of Birth (Must be 18+)</label>
                  <input 
                    type="date" 
                    required 
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                    value={dob} 
                    onChange={handleDobChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-xs text-gray-500 mb-1">Calculated Age</label>
                  <input required type="number" placeholder="Age" value={formData.age} readOnly className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed" />
                </div>
              </div>

              <div className="flex space-x-3">
                <select required value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <select required value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="">Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <input 
                required 
                type="tel" 
                pattern="[0-9]{10}" 
                maxLength="10" 
                title="Please enter exactly 10 digits" 
                placeholder="Contact Number (10 digits)" 
                value={formData.contactNumber} 
                onChange={e => setFormData({...formData, contactNumber: e.target.value.replace(/\D/g, '')})} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" 
              />
              <input required type="text" placeholder="Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
              
              {selectedCamp ? (
                <div className="w-full">
                  <label className="block text-xs text-gray-500 mb-1">Selected Blood Camp</label>
                  <input type="text" value={selectedCamp.name + ' (' + selectedCamp.location + ')'} readOnly className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg text-gray-600 cursor-not-allowed font-medium" />
                </div>
              ) : (
                <select required value={formData.hospitalId} onChange={e => setFormData({...formData, hospitalId: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="">Select Hospital</option>
                  {hospitals.map(h => <option key={h._id} value={h._id}>{h.hospitalName} ({h.location})</option>)}
                </select>
              )}

              <div className="w-full">
                <label className="block text-xs text-gray-500 mb-1">Appointment Date</label>
                <input 
                  required 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.appointmentDate} 
                  onChange={e => setFormData({...formData, appointmentDate: e.target.value})} 
                  readOnly={!!selectedCamp} 
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${selectedCamp ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'focus:ring-2 focus:ring-red-500 focus:border-red-500'}`} 
                />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
