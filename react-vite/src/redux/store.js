import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import searchReducer from "./search";
import securitiesReducer from "./securities";
import watchlistReducer from "./watchlist";
import holdingsReducer from "./holdings";
import commentsReducer from "./comments";
import transactionsReducer from "./transactions";
import newsReducer from "./news";

const rootReducer = combineReducers({
  session: sessionReducer,
  search: searchReducer,
  securities: securitiesReducer,
  watchlist: watchlistReducer,
  holdings: holdingsReducer,
  comments: commentsReducer,
  transactions: transactionsReducer,
  news: newsReducer

});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
