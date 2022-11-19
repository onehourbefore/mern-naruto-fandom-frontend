import axios from 'axios';
import { ResponseType } from '../models/AuthorizationModel';
import { hostName } from '../api/apiData';


export const API_URL = `${hostName}/api`;

const $api = axios.create ({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use (config => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem ('accessToken')}`
    };
    return config;
});

$api.interceptors.response.use ((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get <ResponseType> (`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem ('accessToken', response.data.accessToken);
            return $api.get (`${error.config.url}`);
        } catch (e) {
            console. log ('Не авторизован');
        }
    }
    throw error;
})

export default $api;