const API_BASE_URL = 'http://localhost:5000/api';

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
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },
};

export const projectsApi = {
  getProjects: async (searchTerm = '') => {
    const response = await fetch(`${API_BASE_URL}/projects?search=${searchTerm}`);
    return handleResponse(response);
  },
};
