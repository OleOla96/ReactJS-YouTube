import axios from 'axios';
const BASE_URL = 'http://localhost:8087/';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true,
});
