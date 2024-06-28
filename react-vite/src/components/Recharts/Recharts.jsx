import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RechartsAreaChart = ({ data }) => {
  const formattedData = data.map(d => ({
    date: new Date(d.date).toLocaleString(),
    close: d.data.close,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={formattedData} margin={{ top: 20, right: 30, bottom: 30, left: 40 }}>
        <defs>
          <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#84d884" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#84d884" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(tick) => tick.split(', ')[1]} hide={true} />
        <YAxis domain={['auto', 'auto']} hide={true} />
        <Tooltip />
        <Area type="monotone" dataKey="close" stroke="#84d884" fillOpacity={1} fill="url(#colorClose)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RechartsAreaChart;
