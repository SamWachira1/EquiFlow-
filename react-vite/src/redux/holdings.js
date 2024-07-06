// holdings.js

import { createSelector } from "reselect";
import { updateBuyingPower } from './session'; // Import the updateBuyingPower action

// Action Types
const GET_HOLDINGS = "holdings/get_holdings";
const BUY_HOLDING = "holdings/buy_holding";
const SELL_HOLDING = "holdings/sell_holding";

// Action Creators
const action = (type, payload) => ({
    type,
    payload,
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

export const buyHoldingThunk = (security_id, shares, purchase_price) => async (dispatch) => {
    try {
        const response = await fetch('/api/holdings/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ security_id, shares, purchase_price }),
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

export const sellHoldingThunk = (security_id, shares, sell_price) => async (dispatch) => {
    try {
        const response = await fetch('/api/holdings/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ security_id, shares, sell_price }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(SELL_HOLDING, data.holding)); // Dispatch holding data
            dispatch(updateBuyingPower(data.buying_power)); // Dispatch updated buying power
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

// Selectors
const getHoldings = (state) => state.holdings;

export const getMemoizedHoldings = createSelector(
    [getHoldings],
    (holdings) => Object.values(holdings)
);

// Reducer
const initialState = [];

const holdingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOLDINGS:
            return action.payload;
        case BUY_HOLDING:
            return [...state, action.payload];
        case SELL_HOLDING:
            return state.filter(holding => holding.id !== action.payload.id).concat(action.payload);
        default:
            return state;
    }
};

export default holdingsReducer;
