import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://n-cash-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;