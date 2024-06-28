// src/redux/securities.js

// Action Types
const GET_HISTORICAL_DATA = 'securities/getHistoricalData';
const GET_FUNDAMENTAL_DATA = 'securities/getFundamentalData';
const CLEAR_HISTORICAL_DATA = 'securities/clearHistoricalData';
const CLEAR_FUNDAMENTAL_DATA = 'securities/clearFundamentalData';
const FETCH_SECURITIES_DATA_FAILURE = 'securities/fetchSecuritiesDataFailure';

// Action Creator
const action = (type, payload) => ({
  type,
  payload,
});

// Thunks
export const fetchHistoricalData1D = (symbol) => async (dispatch) => {
  try {
    const response = await fetch(`/api/securities/historical/1d/${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(action(GET_HISTORICAL_DATA, { period: '1d', data }));
  } catch (error) {
    dispatch(action(FETCH_SECURITIES_DATA_FAILURE, error.message));
  }
};

export const fetchHistoricalData1W = (symbol) => async (dispatch) => {
  try {
    const response = await fetch(`/api/securities/historical/1w/${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(action(GET_HISTORICAL_DATA, { period: '1w', data }));
  } catch (error) {
    dispatch(action(FETCH_SECURITIES_DATA_FAILURE, error.message));
  }
};

// Repeat similarly for other periods
export const fetchHistoricalData1M = (symbol) => async (dispatch) => {
  try {
    const response = await fetch(`/api/securities/historical/1m/${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(action(GET_HISTORICAL_DATA, { period: '1m', data }));
  } catch (error) {
    dispatch(action(FETCH_SECURITIES_DATA_FAILURE, error.message));
  }
};

export const fetchHistoricalData3M = (symbol) => async (dispatch) => {
  try {
    const response = await fetch(`/api/securities/historical/3m/${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(action(GET_HISTORICAL_DATA, { period: '3m', data }));
  } catch (error) {
    dispatch(action(FETCH_SECURITIES_DATA_FAILURE, error.message));
  }
};

export const fetchHistoricalDataYTD = (symbol) => async (dispatch) => {
  try {
    const response = await fetch(`/api/securities/historical/ytd/${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(action(GET_HISTORICAL_DATA, { period: 'ytd', data}));
  } catch (error) {
    dispatch(action(FETCH_SECURITIES_DATA_FAILURE, error.message));
  }
};

export const fetchHistoricalData1Y = (symbol) => async (dispatch) => {
  try {
    const response = await fetch(`/api/securities/historical/1y/${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(action(GET_HISTORICAL_DATA, { period: '1y', data }));
  } catch (error) {
    dispatch(action(FETCH_SECURITIES_DATA_FAILURE, error.message));
  }
};

export const fetchHistoricalData5Y = (symbol) => async (dispatch) => {
  try {
    const response = await fetch(`/api/securities/historical/5y/${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(action(GET_HISTORICAL_DATA, { period: '5y', data}));
  } catch (error) {
    dispatch(action(FETCH_SECURITIES_DATA_FAILURE, error.message));
  }
};

export const fetchFundamentalData = (symbol) => async (dispatch) => {
  try {
    const response = await fetch(`/api/securities/fundamentals/${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(action(GET_FUNDAMENTAL_DATA, data));
  } catch (error) {
    dispatch(action(FETCH_SECURITIES_DATA_FAILURE, error.message));
  }
};

export const clearHistoricalData = () => async (dispatch) => {
  dispatch(action(CLEAR_HISTORICAL_DATA));
};

export const clearFundamentalData = () => async (dispatch) => {
  dispatch(action(CLEAR_FUNDAMENTAL_DATA));
};
// Reducer
const initialState = {
  historicalData: {
    '1d': [],
    '1w': [],
    '1m': [],
    '3m': [],
    'ytd': [],
    '1y': [],
    '5y': [],
  },
  fundamentalData: {},
  error: null,
};

const securitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HISTORICAL_DATA: {
      const { period, data } = action.payload;
      return {
        ...state,
        historicalData: {
          ...state.historicalData,
          [period]: data,
        },
        error: null,
      };
    }
    case GET_FUNDAMENTAL_DATA: {
      return {
        ...state,
        fundamentalData: action.payload,
        error: null,
      };
    }
    case CLEAR_HISTORICAL_DATA: {
      return {
        ...state,
        historicalData: {
          '1d': [],
          '1w': [],
          '1m': [],
          '3m': [],
          'ytd': [],
          '1y': [],
          '5y': [],
        },
      };
    }
    case CLEAR_FUNDAMENTAL_DATA: {
      return {
        ...state,
        fundamentalData: {},
      };
    }
    case FETCH_SECURITIES_DATA_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default securitiesReducer;
