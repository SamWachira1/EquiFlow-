// redux/securities.js

const FETCH_SECURITIES_DATA_REQUEST = 'securities/fetchSecuritiesDataRequest';
const FETCH_SECURITIES_DATA_SUCCESS = 'securities/fetchSecuritiesDataSuccess';
const FETCH_SECURITIES_DATA_FAILURE = 'securities/fetchSecuritiesDataFailure';

const action = (type, payload) => ({
  type,
  payload,
});

export const fetchSecuritiesData = (symbol) => async (dispatch) => {
  dispatch(action(FETCH_SECURITIES_DATA_REQUEST));
  try {
    const response = await fetch(`/api/securities/${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(action(FETCH_SECURITIES_DATA_SUCCESS, data));
  } catch (error) {
    dispatch(action(FETCH_SECURITIES_DATA_FAILURE, error.message));
  }
};

export const fetchHistoricalData1D = (symbol) => async (dispatch) => {
  dispatch(action(FETCH_SECURITIES_DATA_REQUEST));
  try {
    const response = await fetch(`/api/securities/historical/1d/${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(action(FETCH_SECURITIES_DATA_SUCCESS, { historicalData: data.data }));
  } catch (error) {
    dispatch(action(FETCH_SECURITIES_DATA_FAILURE, error.message));
  }
};

export const fetchHistoricalData1W = (symbol) => async (dispatch) => {
  dispatch(action(FETCH_SECURITIES_DATA_REQUEST));
  try {
    const response = await fetch(`/api/securities/historical/1w/${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(action(FETCH_SECURITIES_DATA_SUCCESS, { historicalData: data.data }));
  } catch (error) {
    dispatch(action(FETCH_SECURITIES_DATA_FAILURE, error.message));
  }
};

const initialState = {
  loading: false,
  securitiesInfo: {},
  historicalData: [],
  error: '',
};

const securitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SECURITIES_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SECURITIES_DATA_SUCCESS:
      if (action.payload.historicalData) {
        return {
          ...state,
          loading: false,
          historicalData: action.payload.historicalData,
          error: '',
        };
      } else {
        return {
          ...state,
          loading: false,
          securitiesInfo: action.payload,
          error: '',
        };
      }
    case FETCH_SECURITIES_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        securitiesInfo: {},
        historicalData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default securitiesReducer;
