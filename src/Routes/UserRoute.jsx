import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Common/LoadingSpiner";
import useRole from "../components/Hooks/useRole";



const UserRoute = ({children}) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'user') return children

  return <Navigate to='/' />
};

export default UserRoute;