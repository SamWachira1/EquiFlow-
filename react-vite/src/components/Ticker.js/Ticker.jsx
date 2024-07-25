// src/components/Ticker.js
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import styles from './Ticker.module.css'; // Import the CSS module

const ENDPOINT = process.env.NODE_ENV === 'production' ? "https://equiflow.onrender.com" : "http://localhost:8000";

const Ticker = () => {
  const [cryptoData, setCryptoData] = useState({});
  const user = useSelector((state) => state.session.user);
  const cryptoDataRef = useRef(cryptoData);

  useEffect(() => {
    cryptoDataRef.current = cryptoData;
  }, [cryptoData]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('connect', () => {
      console.log('Connected to server');

      // Subscribe to Cryptocurrency data
      const majorSymbols = 'BTC-USD,ETH-USD,XRP-USD,SOL-USD,DOGE-USD,SHIB-USD,LTC-USD';
      socket.emit('subscribe_crypto', { symbols: majorSymbols });
    });

    socket.on('crypto_data', (data) => { // Ensure the event name matches
      const parsedData = JSON.parse(data);
      console.log('Received Crypto data:', parsedData);
      if (parsedData && parsedData.s) {
        setCryptoData(prevData => ({
          ...prevData,
          [parsedData.s]: parsedData,
        }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const tickerItems = Object.values(cryptoData).map((data) => (
    <div className={styles.tickerItem} key={data.s}>
      {data.s}: ${data.p} <span className={data.dc >= 0 ? styles.positive : styles.negative}>{data.dc}%</span>
    </div>
  ));

  return (
    user ? (
      <div className={styles.tickerContainer}>
        <div className={styles.tickerWrapper}>
          {tickerItems}
          {tickerItems} {/* Duplicate items to create seamless loop */}
        </div>
      </div>
    ) : null
  );
};

export default Ticker;
