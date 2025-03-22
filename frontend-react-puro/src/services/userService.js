import axios from 'axios';

<<<<<<< Updated upstream
const API_URL = 'http://localhost:8090'; // Endpoint que está o backend
=======
<<<<<<< Updated upstream
const API_URL = 'http://localhost:8090'; // Endpoint que está o backend
=======
const API_URL = 'http://192.168.0.12:8090'; // Endpoint que está o backend
>>>>>>> Stashed changes
>>>>>>> Stashed changes

export const register = async (name, cpf, email, password) => {
  const response = await axios.post(`${API_URL}/api/users/register`, { name, cpf, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/users/login`, { email, password });
  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfile = async (name, cpf, email) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(
    `${API_URL}/api/users/update`,
    { name, cpf, email },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};