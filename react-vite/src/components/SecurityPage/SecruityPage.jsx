import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSecuritiesData, fetchHistoricalData } from '../../redux/securities';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import styles from './SecuritiesPage.module.css';

const SecuritiesPage = () => {
  const { symbol } = useParams();
  const dispatch = useDispatch();

  const { securitiesInfo, historicalData  } = useSelector((state) => state.securities);
  
  useEffect(() => {
    dispatch(fetchSecuritiesData(symbol));
    dispatch(fetchHistoricalData(symbol));
  }, [symbol, dispatch]);

  // Format the historical data for the chart
  const formattedData = historicalData?.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    close: item.close
  }));

  return (
    <div className={styles.securitiesPage}>
      <div className={styles.header}>
        <h1>{securitiesInfo.name}</h1>
        <p>{securitiesInfo.price} USD</p>
        <p className={styles.change}>
          {securitiesInfo.day_change > 0 ? '+' : ''}{securitiesInfo.day_change} USD
        </p>
        <p className={styles.changePercent}>
          {securitiesInfo.change_percent > 0 ? '+' : ''}{securitiesInfo.change_percent}%
        </p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <div className={styles.orderSection}>
        <h2>Buy {securitiesInfo.name}</h2>
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
      <div className={styles.additionalInfo}>
        <h2>About {securitiesInfo.name}</h2>
        <p>{securitiesInfo.description}</p>
        <h2>Key Statistics</h2>
        <ul>
          <li>Industry: {securitiesInfo.industry}</li>
          <li>Exchange: {securitiesInfo.exchange_long}</li>
          <li>Country: {securitiesInfo.country}</li>
          <li>Market Cap: {securitiesInfo.market_cap}</li>
          <li>52-Week High: {securitiesInfo['52_week_high']}</li>
          <li>52-Week Low: {securitiesInfo['52_week_low']}</li>
          <li>Day High: {securitiesInfo.day_high}</li>
          <li>Day Low: {securitiesInfo.day_low}</li>
          <li>Day Open: {securitiesInfo.day_open}</li>
          <li>Volume: {securitiesInfo.volume}</li>
          <li>Last Trade Time: {new Date(securitiesInfo.last_trade_time).toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
};

export default SecuritiesPage;
