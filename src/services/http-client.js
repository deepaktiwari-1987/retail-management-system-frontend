import axios from 'axios'
import Storage from './storage'
//import { logger } from '../logger/logger';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
const userInfo = Storage.getItem('userInfo') || null;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers['Content-Type'] = 'application/json'
if(userInfo) {
  axios.defaults.headers['Authorization'] = 'Bearer ' + userInfo.token
} 
const config = {
  baseURL: '',
  //   timeout: 60 * 1000, // Timeout
  //   withCredentials: true, // Check cross-site Access-Control
}

const httpClient = axios.create(config)

export { httpClient }
