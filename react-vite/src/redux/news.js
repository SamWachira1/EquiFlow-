// src/store/news.js
import { createSelector } from 'reselect';

// Action Types
const GET_NEWS = 'news/get_news';

// Action Creators
const action = (type, payload) => ({
    type,
    payload,
});

// Thunks
export const getNewsThunk = () => async (dispatch) => {
    try {
        const response = await fetch('/api/news/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(action(GET_NEWS, data));
            return data;
        } else {
            console.error('Failed to fetch news:', response.statusText);
        }
    } catch (error) {
        console.log('Error fetching news:', error);
    }
};

// Selectors
const getNews = (state) => state.news;

export const getMemoizedNews = createSelector(
    [getNews],
    (news) => Object.values(news)
);

// Reducer
const initialState = {};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NEWS:
            return action.payload.reduce((acc, article) => {
                acc[article.date] = article;
                return acc;
            }, {});
        default:
            return state;
    }
};

export default newsReducer;
