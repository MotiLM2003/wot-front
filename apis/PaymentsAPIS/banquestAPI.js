import axios from "axios";
import Cookies from "universal-cookie";
const cookie = new Cookies();

const baseURL = "https://api.sandbox.banquestgateway.com/api/v2/transactions/";
//    process.env.NEXT_PUBLIC_BASEURL || process.env.REACT_APP_BACKEND_URL;
let headers = { "Content-Type": "application/json" };

headers.Authorization = `Basic ZVBWQUhOMHRvRU1RZFUyaDJ3aTE4RU5xTGpEb2hQQUE6MTIzNDU2`;
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = cookie.get("token");
//     if (token) {
//       //   config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;
