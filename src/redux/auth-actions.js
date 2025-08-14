import { authApi } from '../api/api.js';

export const loginRequest = () => ({
  type: 'LOGIN_REQUEST',
});

export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: { user },
});

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: { error },
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const login = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const data = await authApi.login(credentials);
    if (data.success) {
      dispatch(loginSuccess(data.user));
      return data;
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};
