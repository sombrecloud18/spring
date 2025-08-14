import { describe, it, expect } from '@jest/globals';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../auth-actions.js';
import { authReducer } from '../auth-reducer.js';

describe('authReducer', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };

  it('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(authReducer(initialState, { type: LOGIN_REQUEST })).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    const user = { id: 1, username: 'test' };
    expect(
      authReducer({ ...initialState, loading: false }, { type: LOGIN_SUCCESS, payload: { user } }),
    ).toEqual({
      isAuthenticated: true,
      user,
      loading: false,
      error: null,
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    const error = 'Invalid credentials';
    expect(
      authReducer({ ...initialState, loading: false }, { type: LOGIN_FAILURE, payload: { error } }),
    ).toEqual({
      isAuthenticated: false,
      user: null,
      loading: false,
      error,
    });
  });
});
