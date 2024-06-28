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
import styles from './SecuritiesPage.module.css';

const SecuritiesPage = () => {
  const { symbol } = useParams();
  const dispatch = useDispatch();
  const [period, setPeriod] = useState('1d');

  const { historicalData, fundamentalData, realTimeData } = useSelector((state) => state.securities);
  const { user } = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(fetchHistoricalData1D(symbol)); // Fetch 1D data by default
    dispatch(fetchFundamentalData(symbol));
    dispatch(fetchRealTimeData(symbol));

    return () => {
      dispatch(clearHistoricalData());
      dispatch(clearFundamentalData());
      dispatch(clearRealTimeData());
    };
  }, [symbol, dispatch]);

  useEffect(() => {
    if (period === '1d') {
      dispatch(fetchHistoricalData1D(symbol));
    } else if (period === '1w') {
      dispatch(fetchHistoricalData1W(symbol));
    } else if (period === '1m') {
      dispatch(fetchHistoricalData1M(symbol));
    } else if (period === '3m') {
      dispatch(fetchHistoricalData3M(symbol));
    } else if (period === 'ytd') {
      dispatch(fetchHistoricalDataYTD(symbol));
    } else if (period === '1y') {
      dispatch(fetchHistoricalData1Y(symbol));
    } else if (period === '5y') {
      dispatch(fetchHistoricalData5Y(symbol));
    }
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

  return (
    user ? (
      <div className={styles.securitiesPage}>
        <div className={styles.leftColumn}>
          <div className={styles.header}>
            <h1>{general.Name}</h1>
            <p>${closePrice}</p>
            <p>{changePercentage}%</p>
            <p>{general.CurrencySymbol}{general.CurrencyCode}</p>
          </div>
          <div className={styles.chartContainer}>
            <RechartsAreaChart data={historicalData[period]} />
          </div>
          <div className={styles.periodButtons}>
            <button onClick={() => setPeriod('1d')}>1D</button>
            <button onClick={() => setPeriod('1w')}>1W</button>
            <button onClick={() => setPeriod('1m')}>1M</button>
            <button onClick={() => setPeriod('3m')}>3M</button>
            <button onClick={() => setPeriod('ytd')}>YTD</button>
            <button onClick={() => setPeriod('1y')}>1Y</button>
            <button onClick={() => setPeriod('5y')}>5Y</button>
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
          <div className={styles.watchlist}>
            <button>Add to Watchlist</button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default SecuritiesPage;
