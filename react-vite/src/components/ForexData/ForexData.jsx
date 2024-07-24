// src/components/ForexData.js
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import styles from './ForexData.module.css';

const ENDPOINT = process.env.NODE_ENV === 'production' ? "https://equiflow.onrender.com" : "http://localhost:8000";

const ForexData = () => {
  const [forexData, setForexData] = useState({});

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('connect', () => {
      console.log('Connected to server');

      // Subscribe to FOREX data
      const majorSymbols = 'EURUSD, AUDUSD';
      socket.emit('subscribe_forex', { symbols: majorSymbols });
    });

    socket.on('forex_data', (data) => {
      const parsedData = JSON.parse(data);
      console.log('Received FOREX data:', parsedData);
      if (parsedData && parsedData.s) {
        setForexData((prevData) => ({
          ...prevData,
          [parsedData.s]: parsedData,
        }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Invalid Date';
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className={styles.forexData}>
      <h2>Currency Exchange Rates</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Ask Price</th>
            <th>Bid Price</th>
            <th>Daily Change (%)</th>
            <th>Daily Difference</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(forexData).map((data) => (
            <tr key={data.s}>
              <td>{data.s}</td>
              <td>{data.a}</td>
              <td>{data.b}</td>
              <td style={{ color: data.dc >= 0 ? 'green' : 'red' }}>{data.dc}%</td>
              <td>{data.dd}</td>
              <td>{formatTimestamp(data.t)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForexData;
