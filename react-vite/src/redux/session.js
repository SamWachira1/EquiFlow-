import { getWatchlistsThunk } from './watchlist';
import { getHoldingsThunk } from './holdings';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const UPDATE_BUYING_POWER = 'session/updateBuyingPower';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const updateBuyingPower = (newBuyingPower) => ({
  type: UPDATE_BUYING_POWER,
  payload: newBuyingPower,
});

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();

    dispatch(setUser(data));
    dispatch(getHoldingsThunk())
    dispatch(getWatchlistsThunk())
		if (data.errors) {
			return;
		}

		
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};


export const thunkUpdateBuyingPower = (amount) => async (dispatch) => {
  const response = await fetch("/api/users/update-buying-power", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateBuyingPower(data.buying_power));
  }
}

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };

    case UPDATE_BUYING_POWER:
        return {
          ...state,
          user: {
            ...state.user,
            buying_power: action.payload,
          },
        };
    default:
      return state;
  }
}

export default sessionReducer;
