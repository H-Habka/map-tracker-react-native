import axios from "axios";
import { store } from "../redux/store";

const Api = axios.create({
    baseURL: "http://192.168.1.112:3000",
    timeout: 20000,
});

Api.interceptors.request.use(
    function (config) {

        const token = store?.getState()?.userSlice?.user?.token;

        if (token) config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default Api;
