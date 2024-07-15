import { createContext, useState } from "react";


export const AuthContext = createContext(null);


const AuthProvider = ({children}) => {


    const [user, setUser] = useState(null)
    const [loading, setLoader] = useState(true);
    









   // All values
   const allValues = {
   
    setUser,
    setLoader,
   }

    return (
        <AuthContext.Provider value={allValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;