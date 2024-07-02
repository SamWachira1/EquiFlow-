import { useEffect, useState } from 'react';
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
import RechartsAreaChart from '../Recharts';
import LoadingSpinner from '../LoadingSpinner';
// import OpenModalButton from '../OpenModalButton';
import { useModal } from '../../context/Modal';
import WatchlistModal from '../Watchlist/WatchlistModal';
import styles from './SecuritiesPage.module.css';


const SecuritiesPage = () => {
  const { symbol } = useParams();
  const dispatch = useDispatch();
  const [period, setPeriod] = useState('1d');
  const [loadingChart, setLoadingChart] = useState(true);

  const { historicalData, fundamentalData, realTimeData } = useSelector((state) => state.securities);
  const { user } = useSelector((state) => state.session);
  const { setModalContent, closeModal } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingChart(true);
      await dispatch(fetchHistoricalData1D(symbol)); // Fetch 1D data by default
      await dispatch(fetchFundamentalData(symbol));
      await dispatch(fetchRealTimeData(symbol));
      setLoadingChart(false);
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

  const general = fundamentalData.General || {};
  const technicals = fundamentalData.Technicals || {};
  const realTime = realTimeData || {};

  const closePrice = realTime.close || technicals.Last || 'N/A';
  const changePercentage = realTime.change_p || 'N/A';
  const highPrice = realTime.high || technicals.DayHigh || 'N/A';
  const lowPrice = realTime.low || technicals.DayLow || 'N/A';
  const openPrice = realTime.open || technicals.DayOpen || 'N/A';
  const volume = realTime.volume || technicals.Volume || 'N/A';

  const openWatchlistModal = () => {
    setModalContent(<WatchlistModal stock={{ id: symbol, name: general.Name }} onClose={closeModal} />);
  };


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
            <h2>Buy {general.Name}</h2>
            <form>
              <label>Order Type</label>
              <select>
                <option value="buy">Buy Order</option>
                <option value="sell">Sell Order</option>
              </select>
              <label>Buy In</label>
              <select>
                <option value="usd">Dollars</option>
                <option value="shares">Shares</option>
              </select>
              <label>Amount</label>
              <input type="number" placeholder="0.00" />
              <button type="submit">Review Order</button>
            </form>
          </div>
      
          <div className={styles.watchlistButtonContainer}>
            <button onClick={openWatchlistModal} className={styles.addToWatchlistButton}>Add to Lists</button>
          </div>
      
        </div >


    
      </div>
    ) : null
  );
};

export default SecuritiesPage;
