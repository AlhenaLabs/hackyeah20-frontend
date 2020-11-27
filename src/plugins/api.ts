import axios from 'axios';
import {StorageKeys} from "@/enums/StorageKeys";

const authToken = localStorage.getItem(StorageKeys.AUTH_TOKEN);

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        authorization: 'Bearer ' + authToken,
        Accept: 'application/json'
    }
});

export default api;