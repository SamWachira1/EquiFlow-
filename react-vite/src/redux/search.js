// src/actions/searchActions.js

// Action Types
const FETCH_SEARCH_RESULTS_REQUEST = 'search/fetchSearchResultsRequest';
const FETCH_SEARCH_RESULTS_SUCCESS = 'search/fetchSearchResultsSuccess';
const FETCH_SEARCH_RESULTS_FAILURE = 'search/fetchSearchResultsFailure';
const FETCH_SECURITY_DETAILS_REQUEST = 'search/fetchSecurityDetailsRequest';
const FETCH_SECURITY_DETAILS_SUCCESS = 'search/fetchSecurityDetailsSuccess';
const FETCH_SECURITY_DETAILS_FAILURE = 'search/fetchSecurityDetailsFailure';

// Action Creators
const action = (type, payload) => ({
  type,
  payload,
});

// Thunk for fetching search results
export const fetchSearchResults = (query) => async (dispatch) => {
  dispatch(action(FETCH_SEARCH_RESULTS_REQUEST));
  try {
    const response = await fetch(`/api/search/${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(action(FETCH_SEARCH_RESULTS_SUCCESS, data));
  } catch (error) {
    dispatch(action(FETCH_SEARCH_RESULTS_FAILURE, error.message));
  }
};

// Thunk for fetching selected security details
export const fetchSelectedSecurityDetails = (symbol) => async (dispatch) => {
  dispatch(action(FETCH_SECURITY_DETAILS_REQUEST));
  try {
    const response = await fetch(`/api/search/select/${symbol}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(action(FETCH_SECURITY_DETAILS_SUCCESS, data));
  } catch (error) {
    console.error('Error fetching security details:', error);
    dispatch(action(FETCH_SECURITY_DETAILS_FAILURE, error.message));
  }
};

// Initial state
const initialState = {
  loading: false,
  results: [],
  selectedSecurity: null,
  error: ''
};

// Reducer
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
        error: ''
      };
    case FETCH_SEARCH_RESULTS_FAILURE:
      return {
        ...state,
        loading: false,
        results: [],
        error: action.payload
      };
    case FETCH_SECURITY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_SECURITY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedSecurity: action.payload,
        error: ''
      };
    case FETCH_SECURITY_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        selectedSecurity: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default searchReducer;
