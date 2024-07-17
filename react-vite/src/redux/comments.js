import { createSelector } from "reselect";

// Action Types
const CREATE_COMMENT = "comments/create_comment";
const GET_COMMENTS = "comments/get_comments";
const UPDATE_COMMENT = "comments/update_comment";
const DELETE_COMMENT = "comments/delete_comment";
const CLEAR_COMMENTS = "comments/clear_comments";

// Action Creators
const action = (type, payload) => ({
    type,
    payload,
});



// Thunks
export const createCommentThunk = (security_symbol, content) => async (dispatch) => {
    try {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ security_symbol, content }),
            
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            dispatch(action(CREATE_COMMENT, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const getCommentsThunk = (security_symbol) => async (dispatch) => {
    try {
        const response = await fetch(`/api/comments/${security_symbol}`, {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(GET_COMMENTS, data));
            return data;
        } else {
            console.error('Failed to fetch comments:', response.statusText);
        }
    } catch (error) {
        console.log('Error fetching comments:', error);
    }
};

export const updateCommentThunk = (id, content) => async (dispatch) => {
    try {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(UPDATE_COMMENT, data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteCommentThunk = (id) => async (dispatch) => {
    try {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch(action(DELETE_COMMENT, id));
            return id;
        }
    } catch (error) {
        console.log(error);
    }
};

// Selectors
const getComments = (state) => state.comments;

export const getMemoizedComments = createSelector(
    [getComments],
    (comments) => Object.values(comments)
);

export const clearComments = () => ({
    type: CLEAR_COMMENTS,
});

// Reducer
const initialState = {};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload.reduce((acc, comment) => {
                acc[comment.id] = comment;
                return acc;
            }, {});
        case CREATE_COMMENT:
            return { ...state, [action.payload.id]: action.payload };
        case UPDATE_COMMENT:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_COMMENT:
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        case CLEAR_COMMENTS:
            return initialState;
        default:
            return state;
    }
};

export default commentsReducer;
