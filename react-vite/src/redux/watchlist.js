// import { createSelector } from "reselect";

// Action Types
const CREATE_WATCHLIST = "watchlist/create_watchlist";
const GET_WATCHLISTS = "watchlist/get_watchlists";
const UPDATE_WATCHLIST = "watchlist/update_watchlist";
const DELETE_WATCHLIST = "watchlist/delete_watchlist";
const ADD_STOCK_TO_WATCHLIST = "watchlist/add_stock_to_watchlist";


// Action Creators
const action = (type, payload) => ({
    type,
    payload,
});

// Thunks
export const createWatchlistThunk = (name) => async (dispatch) => {
    try {
        const response = await fetch('/api/watchlists/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(CREATE_WATCHLIST, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const getWatchlistsThunk = () => async (dispatch) => {
    try {
        const response = await fetch('/api/watchlists/', {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(GET_WATCHLISTS, data));
            return data;
        } else {
            console.error('Failed to fetch watchlists:', response.statusText);
        }
    } catch (error) {
        console.log('Error fetching watchlists:', error);
    }
};

export const updateWatchlistThunk = (id, name) => async (dispatch) => {
    try {
        const response = await fetch(`/api/watchlists/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(UPDATE_WATCHLIST, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteWatchlistThunk = (id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/watchlists/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch(action(DELETE_WATCHLIST, id));
            return id;
        }
    } catch (error) {
        console.log(error);
    }
};

export const addStockToWatchlistThunk = (stockId, watchlistIds) => async (dispatch) => {
    try {
        const response = await fetch('/api/watchlists/addStock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stockId, watchlistIds }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(ADD_STOCK_TO_WATCHLIST, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

// Selectors
// export const getWatchlistsArray = createSelector(
//     (state) => state.watchlists || {},  // Default to an empty object if undefined or null
//     (watchlists) => Object.values(watchlists)
// );



const initialState = [];

const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WATCHLISTS:
            return action.payload;
        case CREATE_WATCHLIST:
            return [...state, action.payload];
        case UPDATE_WATCHLIST:
            return state.map(watchlist =>
                watchlist.id === action.payload.id ? action.payload : watchlist
            );
        case DELETE_WATCHLIST:
            return state.filter(watchlist => watchlist.id !== action.payload);
        case ADD_STOCK_TO_WATCHLIST:
            return state.map(watchlist => {
                const updatedWatchlist = action.payload.find(w => w.id === watchlist.id);
                return updatedWatchlist ? updatedWatchlist : watchlist;
            });
        default:
            return state;
    }
};


export default watchlistReducer;
