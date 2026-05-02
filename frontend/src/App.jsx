import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Donors from './pages/Donors';
import BloodStock from './pages/BloodStock';
import Hospitals from './pages/Hospitals';
import Appointments from './pages/Appointments';
import BloodCamps from './pages/BloodCamps';
import Admins from './pages/Admins';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="donors" element={<Donors />} />
          <Route path="bloodstock" element={<BloodStock />} />
          <Route path="hospitals" element={<Hospitals />} />
          <Route path="bloodcamps" element={<BloodCamps />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="admins" element={<Admins />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
