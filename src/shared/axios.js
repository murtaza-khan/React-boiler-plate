import axios from 'axios';
import { LOCALSTORAGE } from './constants';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
  if (token)
    config.headers.Authorization = `Bearer ${token}`
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axios;