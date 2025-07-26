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
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();

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
