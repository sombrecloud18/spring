const initialState = {
  isAuthenticated: false,
  error: null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true, loading: false, error: null };

    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };

    case 'LOGIN_FAILURE':
      return { ...state, isAuthenticated: false, loading: false, error: action.payload };

    default:
      return state;
  }
};
