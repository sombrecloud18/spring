import { createStore, combineReducers } from 'redux';
import { authReducer } from './auth-reducer.js';

const preloadedState = {
  auth: {
    token: null,
    isAuthenticated: false,
    user: null,
  },
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(rootReducer, preloadedState);
