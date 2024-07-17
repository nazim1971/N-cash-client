import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Common/LoadingSpiner";
import useAuth from "../components/Hooks/useAuth";





const Private = ({children}) => {
    const {user, loader} = useAuth()

    if(loader){
        return <LoadingSpinner/>
    }
    
    if(user){
        return children
    }
    return (
       <Navigate state={'/'} to='/loginE'></Navigate>
    );
};

export default Private;