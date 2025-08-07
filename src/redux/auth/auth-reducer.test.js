import { describe, it, expect } from '@jest/globals';
import { authReducer } from './auth-reducer.js';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './auth-actions.js';

describe('authReducer', () => {
  const initialState = {
    isAuthenticated: false,
    error: null,
    loading: false,
  };

  it('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(authReducer(initialState, { type: LOGIN_REQUEST })).toEqual({
      isAuthenticated: false,
      error: null,
      loading: true,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(authReducer({ ...initialState, loading: true }, { type: LOGIN_SUCCESS })).toEqual({
      isAuthenticated: true,
      error: null,
      loading: false,
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    const error = 'Invalid credentials';
    expect(
      authReducer({ ...initialState, loading: true }, { type: LOGIN_FAILURE, payload: error }),
    ).toEqual({
      isAuthenticated: false,
      error: error,
      loading: false,
    });
  });
});
