const API_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

export const login = async (username) => {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });
  return handleResponse(response);
};

export const getMessages = async () => {
  const response = await fetch(`${API_URL}/api/messages`);
  return handleResponse(response);
};
