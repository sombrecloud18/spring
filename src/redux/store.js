import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from './auth-reducer.js';

const preloadedState = {
  auth: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));
