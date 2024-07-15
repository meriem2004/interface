import React from 'react';
import Cards from './Cards';
import './ApiMonitoringTable.css';

function ApiMonitoringTable({ searchTerm }) {
  // Sample data for the table (expanded with new fields)
  const apiData = [
    { id: 1, name: 'API 1', status: 'Running', address: '192.168.1.1', port: 8080, lastChecked: '2024-07-12 10:00:00', lastActivated: '2024-07-10 08:00:00', lastDown: '2024-07-05 14:30:00' },
    { id: 2, name: 'API 2', status: 'Down', address: '192.168.1.2', port: 8081, lastChecked: '2024-07-12 09:55:00', lastActivated: '2024-07-11 09:00:00', lastDown: '2024-07-12 09:55:00' },
    { id: 3, name: 'API 3', status: 'Running', address: '192.168.1.3', port: 8082, lastChecked: '2024-07-12 09:50:00', lastActivated: '2024-07-09 11:00:00', lastDown: '2024-07-08 16:45:00' },
    { id: 4, name: 'API 4', status: 'Running', address: '192.168.1.4', port: 8083, lastChecked: '2024-07-12 09:45:00', lastActivated: '2024-07-12 07:30:00', lastDown: '2024-07-07 13:15:00' },
    { id: 5, name: 'API 5', status: 'Down', address: '192.168.1.5', port: 8084, lastChecked: '2024-07-12 09:40:00', lastActivated: '2024-07-11 10:00:00', lastDown: '2024-07-12 09:40:00' },
  ];

  // Filter the apiData based on the search term
  const filteredApiData = apiData.filter(api => 
    api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    api.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate card data based on filtered data
  const totalApis = filteredApiData.length;
  const activatedApis = filteredApiData.filter(api => api.status === 'Running').length;
  const downApis = filteredApiData.filter(api => api.status === 'Down').length;
  const alerts = downApis; // Assuming each down API generates an alert

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>PROCHECK API Monitoring Dashboard</h3>
      </div>
      <Cards 
        totalApis={totalApis}
        activatedApis={activatedApis}
        downApis={downApis}
        alerts={alerts}
      />
      <div className="table-container">
        <table className="api-table">
          <thead>
            <tr>
              <th>API Name</th>
              <th>Status</th>
              <th>Address</th>
              <th>Port</th>
              <th>Last Down Time</th>
              <th>Last Activate Time</th>
              <th>Last Checked</th>
            </tr>
          </thead>
          <tbody>
            {filteredApiData.map((api) => (
              <tr key={api.id}>
                <td>{api.name}</td>
                <td>
                  <span className={`status-dot ${api.status.toLowerCase()}`}></span>
                  {api.status}
                </td>
                <td>{api.address}</td>
                <td>{api.port}</td>
                <td>{api.lastDown || 'N/A'}</td>
                <td>{api.lastActivated || 'N/A'}</td>
                <td>{api.lastChecked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default ApiMonitoringTable;