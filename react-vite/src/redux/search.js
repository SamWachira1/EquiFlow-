// src/actions/searchActions.js

// Action Types
const FETCH_SEARCH_RESULTS_REQUEST = 'search/fetchSearchResultsRequest';
const FETCH_SEARCH_RESULTS_SUCCESS = 'search/fetchSearchResultsSuccess';
const FETCH_SEARCH_RESULTS_FAILURE = 'search/fetchSearchResultsFailure';

// Action Creators
const action = (type, payload) => ({
  type,
  payload,
});

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




const initialState = {
  loading: false,
  results: [],
  error: ''
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        loading: false,
        results: action.payload,
        error: ''
      };
    case FETCH_SEARCH_RESULTS_FAILURE:
      return {
        loading: false,
        results: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default searchReducer;
