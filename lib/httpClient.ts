import axios, { Axios } from 'axios';

let axiosInstance: Axios;

export const HttpClient = () => {
  if (axiosInstance) return axiosInstance;
  axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
  });
  return axiosInstance
};