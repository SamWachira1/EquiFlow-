// src/store/transactions.js
import { createSelector } from 'reselect';

// Action Types
const GET_TRANSACTIONS = 'transactions/get_transactions';

// Action Creators
const action = (type, payload) => ({
  type,
  payload,
});

// Thunks
export const getTransactionsThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/api/transactions/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(action(GET_TRANSACTIONS, data));
      return data;
    } else {
      console.error('Failed to fetch transactions:', response.statusText);
    }
  } catch (error) {
    console.log('Error fetching transactions:', error);
  }
};

// Selectors
const getTransactions = (state) => state.transactions;

export const getMemoizedTransactions = createSelector(
  [getTransactions],
  (transactions) => Object.values(transactions)
);

// Reducer
const initialState = {
  transactions: [],
};

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
};

export default transactionsReducer;
