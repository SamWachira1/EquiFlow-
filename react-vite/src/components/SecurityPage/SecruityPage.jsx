import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchHistoricalData1D,
  fetchHistoricalData1W,
  fetchHistoricalData1M,
  fetchHistoricalData3M,
  fetchHistoricalDataYTD,
  fetchHistoricalData1Y,
  fetchHistoricalData5Y,
  fetchFundamentalData,
  fetchRealTimeData,
  clearHistoricalData,
  clearFundamentalData,
  clearRealTimeData,
} from '../../redux/securities';
import { fetchSearchResults } from '../../redux/search';
import { buyHoldingThunk, sellHoldingThunk, getHoldingsThunk } from '../../redux/holdings';
import { thunkAuthenticate } from '../../redux/session'; // Import the authentication thunk
import RechartsAreaChart from '../SecruityPageChart/Recharts';
import LoadingSpinner from '../LoadingSpinner';
import { useModal } from '../../context/Modal';
import WatchlistModal from '../WatchlistModal/WatchlistModal';
import SecurityNotFound from '../SecurityNotFound';
import Comments from '../Comments';
import styles from './SecuritiesPage.module.css';

const SecuritiesPage = () => {
  const { symbol } = useParams();
  const dispatch = useDispatch();
  const [period, setPeriod] = useState('1d');
  const [loadingChart, setLoadingChart] = useState(true);
  const [amount, setAmount] = useState(0);
  const [estQuantity, setEstQuantity] = useState(0);
  const [showBuyingPowerMessage, setShowBuyingPowerMessage] = useState(false);
  const [orderType, setOrderType] = useState('buy');
  const [buttonText, setButtonText] = useState('Add to Watch List');
  const [isAdded, setIsAdded] = useState(false);
  const [availableShares, setAvailableShares] = useState(0); // Add state for available shares
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const { historicalData, fundamentalData, realTimeData } = useSelector((state) => state.securities);
  const { user } = useSelector((state) => state.session);
  const holdings = useSelector((state) => state.holdings.holdings); // Add holdings from state
  const { setModalContent, closeModal } = useModal();
  const buyingPower = user?.buying_power ? user.buying_power.toFixed(2) : '0.00'; // Round buying power
  const securityId = useSelector((state) => state.search?.selectedSecurity?.id);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingChart(true);
      setLoadingData(true);
      await dispatch(fetchHistoricalData1D(symbol)); // Fetch 1D data by default
      await dispatch(fetchFundamentalData(symbol));
      await dispatch(fetchRealTimeData(symbol));
      await dispatch(fetchSearchResults(symbol))

      setLoadingChart(false);
      setLoadingData(false);
    };

    fetchData();

    return () => {
      dispatch(clearHistoricalData());
      dispatch(clearFundamentalData());
      dispatch(clearRealTimeData());
    };
  }, [symbol, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingChart(true);
      if (period === '1d') {
        await dispatch(fetchHistoricalData1D(symbol));
      } else if (period === '1w') {
        await dispatch(fetchHistoricalData1W(symbol));
      } else if (period === '1m') {
        await dispatch(fetchHistoricalData1M(symbol));
      } else if (period === '3m') {
        await dispatch(fetchHistoricalData3M(symbol));
      } else if (period === 'ytd') {
        await dispatch(fetchHistoricalDataYTD(symbol));
      } else if (period === '1y') {
        await dispatch(fetchHistoricalData1Y(symbol));
      } else if (period === '5y') {
        await dispatch(fetchHistoricalData5Y(symbol));
      }
      setLoadingChart(false);
    };

    fetchData();
  }, [period, dispatch, symbol]);

  const getHoldings = useCallback(() => {
    dispatch(getHoldingsThunk());
  }, [dispatch]);

  useEffect(() => {
    getHoldings();
  }, [getHoldings]);

  useEffect(() => {
    const updateAvailableShares = async () => {
      if (orderType === 'sell' && securityId !== null) {
        await getHoldings();
        const holding = holdings.find(h => h.security_id === securityId);
        setAvailableShares(holding ? holding.shares.toFixed(2) : 0);
      }
    };
    updateAvailableShares();
  }, [orderType, symbol, securityId, getHoldings]);

  const general = fundamentalData.General || {};
  const technicals = fundamentalData.Technicals || {};
  const realTime = realTimeData || {};

  const closePrice = realTime.close || technicals.Last || '-';
  const changePercentage = realTime.change_p || '-';
  const highPrice = realTime.high || technicals.DayHigh || '-';
  const lowPrice = realTime.low || technicals.DayLow || '-';
  const openPrice = realTime.open || technicals.DayOpen || '-';
  const volume = realTime.volume || technicals.Volume || '-';

  const openWatchlistModal = () => {
    setModalContent(
      <WatchlistModal 
        stock={{ symbol: symbol, name: general.Name }} 
        onClose={(newMessage) => {
          closeModal();
          if (newMessage) {
            setButtonText('✓ Added to Watchlist');
            setIsAdded(true);
            setTimeout(() => {
              setButtonText('Add to Watch List');
              setIsAdded(false);
            }, 3000);
          }
        }} 
      />
    );
  };

  useEffect(() => {
    if (amount > 0 && closePrice !== '-') {
      if (orderType === 'buy') {
        setEstQuantity((amount / closePrice).toFixed(6));
      } else if (orderType === 'sell') {
        setEstQuantity(amount);
      } else {
        setEstQuantity(0);
      }
    } else {
      setEstQuantity(0);
    }
  }, [amount, closePrice, orderType]);

  const handleReviewOrder = (e) => {
    e.preventDefault();
    if (amount <= 0) {
      setErrorMessage('Amount must be greater than zero.');
      return;
    }
    if (orderType === 'sell' && amount > availableShares) {
      setErrorMessage('You cannot sell more shares than you have.');
      return;
    }
    setShowBuyingPowerMessage(true);
    setErrorMessage(''); // Clear error message
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (amount <= 0) {
      setErrorMessage('Amount must be greater than zero.');
      return;
    }
    if (orderType === 'sell' && amount > availableShares) {
      setErrorMessage('You cannot sell more shares than you have.');
      return;
    }
    
    const parsedAmount = parseFloat(amount);
    const parsedEstQuantity = parseFloat(estQuantity);
    const parsedClosePrice = parseFloat(closePrice);
  
    if (orderType === 'buy') {
      await dispatch(buyHoldingThunk(symbol, general.Name, parsedEstQuantity, parsedClosePrice));
    } else if (orderType === 'sell') {
      await dispatch(sellHoldingThunk(symbol, parsedAmount, parsedClosePrice));
    }

    await dispatch(thunkAuthenticate()); // Refresh user data
    getHoldings(); // Refresh holdings data
  };

  if (loadingData) {
    return <LoadingSpinner />;
  }

  if (!general.Name || closePrice==='NA'|| closePrice === '-') {
    return <SecurityNotFound />;
  }
  
  return (
    user ? (
      <div className={styles.securitiesPage}>
        <div className={styles.leftColumn}>
          <div className={styles.header}>
            <h1>{general.Name}</h1>
            <p>${closePrice}</p>
            <p>{changePercentage}%</p>
          </div>
          <div className={styles.chartContainer}>
            {loadingChart ? <LoadingSpinner /> : <RechartsAreaChart data={historicalData[period]} />}
          </div>
          <div className={styles.periodButtons}>
            <button onClick={() => setPeriod('1d')} disabled={loadingChart}>{loadingChart && period === '1d' ? 'Loading...' : '1D'}</button>
            <button onClick={() => setPeriod('1w')} disabled={loadingChart}>{loadingChart && period === '1w' ? 'Loading...' : '1W'}</button>
            <button onClick={() => setPeriod('1m')} disabled={loadingChart}>{loadingChart && period === '1m' ? 'Loading...' : '1M'}</button>
            <button onClick={() => setPeriod('3m')} disabled={loadingChart}>{loadingChart && period === '3m' ? 'Loading...' : '3M'}</button>
            <button onClick={() => setPeriod('ytd')} disabled={loadingChart}>{loadingChart && period === 'ytd' ? 'Loading...' : 'YTD'}</button>
            <button onClick={() => setPeriod('1y')} disabled={loadingChart}>{loadingChart && period === '1y' ? 'Loading...' : '1Y'}</button>
            <button onClick={() => setPeriod('5y')} disabled={loadingChart}>{loadingChart && period === '5y' ? 'Loading...' : '5Y'}</button>
          </div>
          <div className={styles.additionalInfo}>
            <h2>About {general.Name}</h2>
            <p>{general.Description}</p>
            <h2>Key Statistics</h2>
            <ul>
              <li>Exchange: {general.Exchange}</li>
              <li>Country: {general.CountryName}</li>
              <li>Market Cap: {general.MarketCap}</li>
              <li>52-Week High: {technicals['52WeekHigh']}</li>
              <li>52-Week Low: {technicals['52WeekLow']}</li>
              <li>Day High: {highPrice}</li>
              <li>Day Low: {lowPrice}</li>
              <li>Day Open: {openPrice}</li>
              <li>Volume: {volume}</li>
              <li>Beta: {technicals.Beta}</li>
              <li>50-Day Moving Average: {technicals['50DayMA']}</li>
              <li>200-Day Moving Average: {technicals['200DayMA']}</li>
            </ul>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.orderSection}>
            <h2>{orderType === 'buy' ? 'Buy' : 'Sell'} {general.Name}</h2>
            <form onSubmit={showBuyingPowerMessage ? handleSubmitOrder : handleReviewOrder}>
              <label>Order Type</label>
              <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                <option value="buy">Buy Order</option>
                <option value="sell">Sell Order</option>
              </select>
              <label>{orderType === 'buy' ? 'Amount in Dollars' : 'Amount in Shares'}</label>
              <input 
                type="number" 
                placeholder="0.00" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {errorMessage && <p className={styles.error}>{errorMessage}</p>}
              <p>{orderType === 'buy' ? `Est. Quantity: ${estQuantity}` : `Available Shares: ${availableShares}`}</p>
              <button type="submit">{showBuyingPowerMessage ? 'Submit Order' : 'Review Order'}</button>
            </form>
            {showBuyingPowerMessage && (
              <p className={styles.buyingPowerMessage}>${buyingPower} buying power available</p>
            )}
          </div>
          <div className={styles.watchlistButtonContainer}>
            <button 
              onClick={openWatchlistModal} 
              className={styles.addToWatchlistButton} 
              disabled={isAdded}
            >
              {buttonText}
            </button>
          </div>
          <Comments securitySymbol={symbol} /> {/* Integrate Comments component */}
        </div>
      </div>
    ) : null
  );
};

export default SecuritiesPage;
