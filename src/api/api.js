const API_BASE_URL = 'http://localhost:5000/api';

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }
  return response.json();
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
    return handleResponse(response);
  },

  refreshToken: async () => {
    const response = await fetch(`${API_BASE_URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return handleResponse(response);
  },
};

export const projectsApi = {
  getProjects: async (searchTerm = '') => {
    const headers = {};
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}/projects?search=${searchTerm}`, {
      headers,
      credentials: 'include',
    });

    if (response.status === 403) {
      const refreshResponse = await authApi.refreshToken();
      setAccessToken(refreshResponse.accessToken);

      const retryResponse = await fetch(`${API_BASE_URL}/projects?search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${refreshResponse.accessToken}`,
        },
        credentials: 'include',
      });
      return handleResponse(retryResponse);
    }

    return handleResponse(response);
  },
};
