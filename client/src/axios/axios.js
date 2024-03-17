import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  serverURL:'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Get the access token from cookies
    const accessToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='))
      .split('=')[1];
    
    // Add the access token to the request headers
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
