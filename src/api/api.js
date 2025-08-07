const API_BASE_URL = 'http://localhost:5000/api';

let accessToken = localStorage.getItem('accessToken') || null;
let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

async function handleResponse(response) {
  if (response.status === 401) {
    clearAuthData();
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message || 'Request failed');
    error.response = {
      status: response.status,
      data: errorData,
    };
    throw error;
  }
  return response.json();
}

export const setAccessToken = (token) => {
  accessToken = token;
  if (token) {
    localStorage.setItem('accessToken', token);
  } else {
    localStorage.removeItem('accessToken');
  }
};

export const clearAuthData = () => {
  setAccessToken(null);
  localStorage.removeItem('user');
};

async function fetchWithAuth(url, options = {}) {
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  let response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401 && !url.includes('/refresh-token')) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshResponse = await authApi.refreshToken();
        setAccessToken(refreshResponse.accessToken);
        onRefreshed(refreshResponse.accessToken);
      } catch (error) {
        clearAuthData();
        window.location.href = '/login';
        throw error;
      } finally {
        isRefreshing = false;
      }
    }

    return new Promise((resolve) => {
      subscribeTokenRefresh((newToken) => {
        const retryOptions = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          },
        };
        resolve(fetch(url, retryOptions).then(handleResponse));
      });
    });
  }

  return handleResponse(response);
}

export const authApi = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 401) {
        throw {
          success: false,
          message: errorData.message || 'Incorrect username or password',
        };
      }
      throw new Error(errorData.message || 'Login failed');
    }
    const data = await handleResponse(response);
    setAccessToken(data.accessToken);
    return data;
  },

  refreshToken: async () => {
    const response = await fetch(`${API_BASE_URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });
    return handleResponse(response);
  },

  logout: async () => {
    await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    clearAuthData();
  },

  signUp: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      const data = await handleResponse(response);
      return data;
    } catch (error) {
      if (error.response?.status === 400 && error.response.data?.errors) {
        const fieldErrors = {};
        Object.entries(error.response.data.errors).forEach(([, message]) => {
          const fieldName = message.includes('Last name')
            ? 'lastName'
            : message.includes('First name')
              ? 'firstName'
              : message.includes('Username')
                ? 'username'
                : message.includes('Password')
                  ? 'password'
                  : message.includes('Age')
                    ? 'age'
                    : 'repeatPassword';

          fieldErrors[fieldName] = message;
        });

        throw {
          errors: fieldErrors,
          message: 'Validation failed',
        };
      }
      throw error;
    }
  },
};

export const projectsApi = {
  getProjects: async (searchTerm = '') =>
    fetchWithAuth(`${API_BASE_URL}/projects?search=${searchTerm}`),
};
