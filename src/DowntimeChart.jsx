import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Cards from './Cards';

function DowntimeChart() {
  const data = [
    { name: 'Jan', downtime: 2 },
    { name: 'Feb', downtime: 1 },
    { name: 'Mar', downtime: 3 },
    { name: 'Apr', downtime: 0 },
    { name: 'May', downtime: 2 },
    { name: 'Jun', downtime: 1 },
  ];

  // For demonstration, we'll use some placeholder data for the cards
  const totalApis = 5;
  const activatedApis = 3;
  const downApis = 2;
  const alerts = 2;

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>Downtime Chart</h3>
      </div>
      <Cards 
        totalApis={totalApis}
        activatedApis={activatedApis}
        downApis={downApis}
        alerts={alerts}
      />
      <div className='charts'>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="downtime" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default DowntimeChart;