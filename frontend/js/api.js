const API_URL = "http://localhost:5000/api/v1";

const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('bnc_token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    return response.json();
};
