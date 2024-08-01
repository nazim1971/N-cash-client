import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";
import Cookies from "js-cookie";

const axiosSecure = axios.create({
    baseURL: 'https://n-cash-server.vercel.app'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    // Request interceptor to add authorization header for every secure call to the API
    axiosSecure.interceptors.request.use(function (config) {
        const token = Cookies.get('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        console.log(error);
        const status = error.response?.status;
        console.log(status);
        if (status === 401 || status === 403) {
            await logout();
            navigate('/loginE');
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;
