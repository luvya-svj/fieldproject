import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import DoctorDetails from './pages/DoctorDetails';
import HospitalDetails from './pages/HospitalDetails';
import Pharmacies from './pages/Pharmacies';

// import './styles/global.css';
// import './styles/components.css'; // Already removed

import { UserLocationProvider } from './context/UserLocationContext';

function App() {
  return (
    <UserLocationProvider>
      <Router>
        <div className="min-h-screen flex flex-col transition-colors duration-500">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/doctor/:id" element={<DoctorDetails />} />
              <Route path="/hospital/:id" element={<HospitalDetails />} />
              <Route path="/pharmacies" element={<Pharmacies />} />
            </Routes>
          </main>

          <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 py-8 mt-auto transition-colors duration-500">
            <div className="container mx-auto px-4">
              <p className="text-sm text-gray-500 dark:text-slate-400 text-center">© 2026 MediMap Healthcare. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </UserLocationProvider>
  );
}

export default App;
