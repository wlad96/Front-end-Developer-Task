import axios from 'axios';

const api = axios.create({
  baseURL: 'https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1',
});

export default api;