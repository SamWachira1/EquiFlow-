import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getHoldingsThunk,
  fetchCombinedHistoricalData1W, 
  fetchCombinedHistoricalData1M, 
  fetchCombinedHistoricalData3M, 
  fetchCombinedHistoricalDataYTD, 
  fetchCombinedHistoricalData1Y, 
  clearHoldingsData 
} from '../../redux/holdings';
import LoadingSpinner from '../LoadingSpinner';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import styles from './PortfolioGraph.module.css';

const PortfolioGraph = ({ height = 400 }) => {
  const dispatch = useDispatch();
  const combinedHistoricalData = useSelector((state) => state.holdings.combinedHistoricalData);
  const holdings = useSelector((state) => state.holdings.holdings || []);
  const user = useSelector((state) => state.session.user);
  const [portfolioValue, setPortfolioValue] = useState([]);
  const [loadingChart, setLoadingChart] = useState(true);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [defaultPrice, setDefaultPrice] = useState(0);
  const [dateRange, setDateRange] = useState('1Y'); // Default to 1 Year

  useEffect(() => {
    const fetchData = async () => {
      setLoadingChart(true);
      dispatch(getHoldingsThunk())
      if (dateRange === '1W') {
        await dispatch(fetchCombinedHistoricalData1W());
      } else if (dateRange === '1M') {
        await dispatch(fetchCombinedHistoricalData1M());
      } else if (dateRange === '3M') {
        await dispatch(fetchCombinedHistoricalData3M());
      } else if (dateRange === 'YTD') {
        await dispatch(fetchCombinedHistoricalDataYTD());
      } else {
        await dispatch(fetchCombinedHistoricalData1Y());
      }
      setLoadingChart(false);
    };

    if (user) {
      fetchData();
    }

    return () => {
      dispatch(clearHoldingsData());
    };
  }, [dispatch, dateRange, user]);

  useEffect(() => {
    if (Array.isArray(holdings) && holdings.length > 0 && Object.keys(combinedHistoricalData).length > 0) {
      calculatePortfolioValue();
    } else {
      setPortfolioValue([]);
      setCurrentPrice(0);
      setDefaultPrice(0);
    }
  }, [combinedHistoricalData, holdings]);

  const calculatePortfolioValue = () => {
    const dates = Object.keys(combinedHistoricalData);
    const values = dates.map((date) => {
      const totalValue = holdings.reduce((acc, holding) => {
        const price = combinedHistoricalData[date][holding.symbol]?.close || 0;
        return acc + (holding.shares * price);
      }, 0);
      return { date, value: totalValue };
    });
    setPortfolioValue(values);

    if (values.length > 0) {
      const latestValue = values[values.length - 1].value;
      setCurrentPrice(latestValue);
      setDefaultPrice(latestValue);
    }
  };

  const formattedData = portfolioValue.map((data) => ({
    date: new Date(data.date).toLocaleDateString('en-US'),
    close: data.value,
  }));

  const handleMouseMove = (e) => {
    if (e && e.activePayload && e.activePayload.length > 0) {
      const newPrice = e.activePayload[0].payload.close;
      setCurrentPrice(newPrice);
    } else {
      setCurrentPrice(defaultPrice);
    }
  };

  if (loadingChart) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    user ? (
      <div className={styles.portfolioGraph}>
        <div className={styles.priceDisplay}>
          <div>${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={formattedData} margin={{ top: 80, right: 30, bottom: 30, left: 0 }} onMouseMove={handleMouseMove}>
            <defs>
              <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C807" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00C807" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tickFormatter={(tick) => tick.split('/')[1]} hide={true} axisLine={{ stroke: '#d3d3d3' }} tickLine={false} />
            <YAxis domain={['auto', 'auto']} hide={true} axisLine={{ stroke: '#d3d3d3' }} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="close" stroke="#84d884" fillOpacity={1} fill="url(#colorClose)" />
          </AreaChart>
        </ResponsiveContainer>
        <div className={styles.dateRangeButtons}>
          <button onClick={() => setDateRange('1W')}>1W</button>
          <button onClick={() => setDateRange('1M')}>1M</button>
          <button onClick={() => setDateRange('3M')}>3M</button>
          <button onClick={() => setDateRange('YTD')}>YTD</button>
          <button onClick={() => setDateRange('1Y')}>1Y</button>
        </div>
      </div>
    ) : null
  );
};

export default PortfolioGraph;
