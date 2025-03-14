import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Endpoint que está o backend

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