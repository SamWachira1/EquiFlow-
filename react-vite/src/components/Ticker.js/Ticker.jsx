// src/components/Ticker.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import styles from './Ticker.module.css'; // Import the CSS module

const ENDPOINT = process.env.NODE_ENV === 'production' ? "https://equiflow.onrender.com" : "http://localhost:8000";

const Ticker = () => {
  const [cryptoData, setCryptoData] = useState({});
  const user = useSelector((state) => state.session.user);
  const location = useLocation();
  const isHomePage = location.pathname === '/';



  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('connect', () => {
      console.log('Connected to server');

      // Subscribe to Cryptocurrency data
      const majorSymbols = 'BTC-USD, ETH-USD, LTC-USD, XRP-USD, DOGE-USD';
      socket.emit('crypto_data', { symbols: majorSymbols });
    });

    socket.on('crypto_data', (data) => { // Update event name
      const parsedData = JSON.parse(data);
      console.log('Received Crypto data:', parsedData);
      if (parsedData && parsedData.s) {
        setCryptoData((prevData) => ({
          ...prevData,
          [parsedData.s]: parsedData,
        }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    user && isHomePage ? (
      <div className={styles.tickerContainer}>
        <div className={styles.ticker}>
          {Object.values(cryptoData).map((data) => (
            <div className={styles.tickerItem} key={data.s}>
              {data.s}: ${data.p} <span className={data.dc >= 0 ? styles.positive : styles.negative}>{data.dc}%</span>
            </div>
          ))}
        </div>
      </div>
    ) : null
  );
};

export default Ticker;
