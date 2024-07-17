import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/Common/LoadingSpiner"
import useRole from "../components/Hooks/useRole"


const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'admin') return children
  return <Navigate to='/dashboard' />
}

export default AdminRoute


