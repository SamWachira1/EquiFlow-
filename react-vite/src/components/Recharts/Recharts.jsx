import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Recharts.module.css';

const RechartsAreaChart = ({ data }) => {

  // Sort data by date in ascending order
  const formattedData = data
    .map(d => ({
      date: new Date(d.date).toLocaleDateString(), // Convert date to locale date string
      close: d.close,
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
