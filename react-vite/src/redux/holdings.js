// holdings.js

import { createSelector } from "reselect";
import { updateBuyingPower } from './session'; // Import the updateBuyingPower action

// Action Types
const GET_HOLDINGS = "holdings/get_holdings";
const BUY_HOLDING = "holdings/buy_holding";
const SELL_HOLDING = "holdings/sell_holding";
const GET_COMBINED_HISTORICAL_DATA = "holdings/get_combined_historical_data";
const FETCH_HOLDINGS_DATA_FAILURE = "holdings/fetchHoldingsDataFailure";
const CLEAR_HOLDINGS = "holdings/clear_holdings";

// Action Creators
const action = (type, payload) => ({
    type,
    payload,
});

export const clearHoldingsData = () => ({
    type: CLEAR_HOLDINGS,
});

// Thunks
export const getHoldingsThunk = () => async (dispatch) => {
    try {
        const response = await fetch('/api/holdings/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(GET_HOLDINGS, data));
            return data;
        } else {
            console.error('Failed to fetch holdings:', response.statusText);
        }
    } catch (error) {
        console.log('Error fetching holdings:', error);
    }
};

export const buyHoldingThunk = (stockSymbol, stockName, shares, purchasePrice) => async (dispatch) => {
    try {
        const response = await fetch('/api/holdings/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stock_symbol: stockSymbol, stock_name: stockName, shares, purchase_price: purchasePrice }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(BUY_HOLDING, data.holding)); // Dispatch holding data
            dispatch(updateBuyingPower(data.buying_power)); // Dispatch updated buying power
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const sellHoldingThunk = (stockSymbol, shares, sellPrice) => async (dispatch) => {
    try {
        const response = await fetch('/api/holdings/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stock_symbol: stockSymbol, shares, sell_price: sellPrice }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(SELL_HOLDING, data.holding)); // Dispatch holding data
            dispatch(updateBuyingPower(data.buying_power)); // Dispatch updated buying power
            return data;
        } else {
            const errorData = await response.json();
            console.error('Error selling holding:', errorData.error);
            // Handle error accordingly, maybe dispatch an error action
        }
    } catch (error) {
        console.error('Error selling holding:', error);
        // Handle error accordingly, maybe dispatch an error action
    }
};

export const getCombinedHistoricalDataThunk = () => async (dispatch) => {
    try {
        const response = await fetch('/api/holdings/combined_historical_data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(GET_COMBINED_HISTORICAL_DATA, data));
            return data;
        } else {
            const errorText = await response.text();
            console.error('Failed to fetch combined historical data:', response.status, response.statusText, errorText);
        }
    } catch (error) {
        console.log('Error fetching combined historical data:', error);
    }
};

export const fetchCombinedHistoricalData1W = () => async (dispatch) => {
    await fetchDataThunk('/api/holdings/combined_historical_data_1w', dispatch);
};

export const fetchCombinedHistoricalData1M = () => async (dispatch) => {
    await fetchDataThunk('/api/holdings/combined_historical_data_1m', dispatch);
};

export const fetchCombinedHistoricalData3M = () => async (dispatch) => {
    await fetchDataThunk('/api/holdings/combined_historical_data_3m', dispatch);
};

export const fetchCombinedHistoricalDataYTD = () => async (dispatch) => {
    await fetchDataThunk('/api/holdings/combined_historical_data_ytd', dispatch);
};

export const fetchCombinedHistoricalData1Y = () => async (dispatch) => {
    await fetchDataThunk('/api/holdings/combined_historical_data_1y', dispatch);
};


const fetchDataThunk = async (url, dispatch) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(GET_COMBINED_HISTORICAL_DATA, data));
            return data;
        } else {
            const errorText = await response.text();
            console.error(`Failed to fetch combined historical data from ${url}:`, response.status, response.statusText, errorText);
            dispatch(action(FETCH_HOLDINGS_DATA_FAILURE, errorText));
        }
    } catch (error) {
        console.log(`Error fetching combined historical data from ${url}:`, error);
        dispatch(action(FETCH_HOLDINGS_DATA_FAILURE, error.message));
    }
};

// Selectors
const getHoldings = (state) => state.holdings;

export const getMemoizedHoldings = createSelector(
    [getHoldings],
    (holdings) => Object.values(holdings)
);

// Reducer
const initialState = {
    holdings: [],
    combinedHistoricalData: {} // Initial state for combined historical data
};

const holdingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOLDINGS:
            return { ...state, holdings: action.payload };
        case BUY_HOLDING:
            return { ...state, holdings: [...state.holdings, action.payload] };
        case SELL_HOLDING:
            return { 
                ...state, 
                holdings: state.holdings.filter(holding => holding.id !== action.payload.id).concat(action.payload) 
            };
        case GET_COMBINED_HISTORICAL_DATA: // New case for combined historical data
            return { ...state, combinedHistoricalData: action.payload };

        case FETCH_HOLDINGS_DATA_FAILURE:
                return { ...state, error: action.payload };

        case CLEAR_HOLDINGS:
            return { ...state, holdings: [], combinedHistoricalData: {} }; // Clear holdings and historical data
        
        default:
            return state;
    }
};

export default holdingsReducer;
