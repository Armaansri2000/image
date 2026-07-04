import axios from 'axios';

// const API_BASE = 'http://localhost:5000/api';

const API_BASE = '/api';

export const fetchImages = (params, signal) => {
  return axios.get(`${API_BASE}/images`, { params, signal });
};
