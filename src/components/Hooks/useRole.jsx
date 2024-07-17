import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"


const useRole = () => {
  const { user, loader, logout } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role = '', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loader && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/v1/loger`,{ params: {email: user?.email,}, withCredentials: true})
      return data.role
    },
    onError: () => {
      logout();
    }
  })

  //   Fetch user info using logged in user email

  return [role, isLoading]
}

export default useRole
