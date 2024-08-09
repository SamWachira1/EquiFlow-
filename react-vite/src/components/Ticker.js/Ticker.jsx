// src/components/Ticker.js
import { useEffect, useState, useRef } from 'react';
import {useLocation} from "react-router-dom"
import { useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import styles from './Ticker.module.css'; // Import the CSS module

const ENDPOINT = process.env.NODE_ENV === 'production' ? "https://equiflow.onrender.com" : "http://localhost:8000";

const Ticker = () => {
  const [cryptoData, setCryptoData] = useState({});
  const user = useSelector((state) => state.session.user);
  const cryptoDataRef = useRef(cryptoData);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    cryptoDataRef.current = cryptoData;
  }, [cryptoData]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('connect', () => {
      console.log('Connected to server');

      // Subscribe to Cryptocurrency data
      const majorSymbols = 'BTC-USD,ETH-USD,XRP-USD,SOL-USD,DOGE-USD,LTC-USD';
      socket.emit('subscribe_crypto', { symbols: majorSymbols });
    });

    socket.on('crypto_data', (data) => {
      const parsedData = JSON.parse(data);
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

  // Only render ticker if there's crypto data
  return (
    user && isHomePage && Object.keys(cryptoData).length > 0 ? (
      <div className={styles.tickerContainer}>
        <div className={styles.tickerWrapper}>
          {Object.values(cryptoData).map((data) => {
            const roundedPrice = parseFloat(data.p).toFixed(4); // Round to 4 decimal places
            return (
              <div className={styles.tickerItem} key={data.s}>
                {data.s}: <span className={styles.price}>${roundedPrice}</span>
                <span className={`${styles.change} ${data.dc >= 0 ? styles.positive : styles.negative}`}>{data.dc}%</span>
              </div>
            );
          })}
        </div>
      </div>
    ) : null
  );
};

export default Ticker
