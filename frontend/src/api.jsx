import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.DEV
        ? import.meta.env.VITE_LOCAL_API
        : import.meta.env.VITE_PROD_API,
});

export default API;