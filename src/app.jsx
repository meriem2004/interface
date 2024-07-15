import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ApiMonitoringTable from './ApiMonitoringTable';
import DowntimeChart from './DowntimeChart';
import './App.css'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  }

  return (
    <Router>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Routes>
          <Route path="/api-monitoring-table" element={<ApiMonitoringTable searchTerm={searchTerm} />} />
          <Route path="/downtime-chart" element={<DowntimeChart searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;