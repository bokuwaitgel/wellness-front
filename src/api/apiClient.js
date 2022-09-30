import axios from 'axios';
export const CLIENT_ID = 'Wallet';

export const setToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const apiClient = axios.create({
  headers: {
    client_id: CLIENT_ID
  },
  baseURL: 'https://test.hipay.mn',
  timeout: 65000
});
export const getAccessToken = () => {
  return apiClient.defaults.headers.common.Authorization.split(' ')[1];
};

export const setInterceptor = (fn = function () {}, efn = function () {}) => {
  apiClient.interceptors.response.use(fn, efn);
};
