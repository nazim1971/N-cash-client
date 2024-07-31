
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';


const useSingleUser = ({ queryKey, params = {},enabled }) => {
    const axiosPublic = useAxiosPublic()
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosPublic(`/v1/loger`,{ 
        params,
        withCredentials: true});
      return data;
    },
    enabled
  });
};

export default useSingleUser;
