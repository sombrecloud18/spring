import { authApi } from '../../api/api';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (username, password) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const data = await authApi.login({ username, password });
    if (data.success) {
      dispatch(loginSuccess());
      return true;
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};
