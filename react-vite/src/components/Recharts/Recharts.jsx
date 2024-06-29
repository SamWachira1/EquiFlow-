import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Recharts.module.css';

const RechartsAreaChart = ({ data }) => {
    const formatDate = (d) => {
        if (d.Datetime) {
          return new Date(d.Datetime).toLocaleString();
        } else if (d.date) {
          return new Date(d.date).toLocaleDateString();
        }
        return new Date(d.timestamp * 1000).toLocaleString();
      };
    
      // Helper function to get close price
      const getClosePrice = (d) => {
        if (d.close) {
          return parseFloat(d.close);
        }
        return parseFloat(d.Close);
      };
    
      // Sort data by timestamp or date in ascending order and format the data correctly
      const formattedData = data
        .map(d => ({
          date: formatDate(d), // Convert to locale date-time string
          close: getClosePrice(d), // Parse close price
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData} margin={{ top: 20, right: 30, bottom: 30, left: 0 }}>
          <defs>
            <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#84d884" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#84d884" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tickFormatter={(tick) => tick.split('/')[1]} hide={true} axisLine={{ stroke: '#d3d3d3' }} tickLine={false} />
          <YAxis domain={['auto', 'auto']} hide={true} axisLine={{ stroke: '#d3d3d3' }} tickLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="close" stroke="#84d884" fillOpacity={1} fill="url(#colorClose)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsAreaChart;
