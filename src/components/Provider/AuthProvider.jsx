import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [sendAmount, setSendAmount] = useState(() => {
    const storedAmount = localStorage.getItem("sendAmount");
    return storedAmount ? JSON.parse(storedAmount) : null;
  });

  const [receiveUser, setReceiveUser] = useState(() => {
    const storedReceiveUser = localStorage.getItem("receiveUser");
    return storedReceiveUser ? JSON.parse(storedReceiveUser) : null;
  });

  const [cashoutAgent, setCashoutAgent] = useState(() => {
    const storedAmount = localStorage.getItem("cashoutAgent");
    return storedAmount ? JSON.parse(storedAmount) : null;
  });
  const [cashoutAmount, setCashoutAmount] = useState(() => {
    const storedAmount = localStorage.getItem("cashoutAmount");
    return storedAmount ? JSON.parse(storedAmount) : null;
  });

  const [cashinAgent, setCashinAgent] = useState(() => {
    const storedAmount = localStorage.getItem("cashinAgent");
    return storedAmount ? JSON.parse(storedAmount) : null;
  });

  const [cashinAmount, setCashinAmount] = useState(() => {
    const storedAmount = localStorage.getItem("cashinAmount");
    return storedAmount ? JSON.parse(storedAmount) : null;
  });

  const [reqUser, setReqUser] = useState(() => {
    const storedAmount = localStorage.getItem("reqUser");
    return storedAmount ? JSON.parse(storedAmount) : null;
  });

  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  // Save data to local storage

  const login = async (input) => {
    try {
      setLoader(true);
      const res = await axiosPublic.post("/v1/login", input, {
        withCredentials: true,
      });
      if (res?.data?.Status === "Success") {
        setUser(res?.data?.User);
        console.log(res.data.User);
        localStorage.setItem("user", JSON.stringify(res?.data?.User));
        toast.success("Login Successfully");
      } else {
        toast.error(res?.data?.Status || "Login failed");
      }
      return res?.data;
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to login");
      return { Status: "Error", message: err.message || "Failed to login" };
    } finally {
      setLoader(false);
    }
  };

  //pinVerification

  const pinVerify = async (input) => {
    try {
      setLoader(true);
      const res = await axiosPublic.post("/v1/checkPin", input, {
        withCredentials: true,
      });
      if (res?.data?.Status === "Success") {
        toast.success("Pin OK");
      } else {
        toast.error(res?.data?.Status || "Login failed");
      }
      return res?.data;
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Wrong Pin");
      return { Status: "Error", message: err.message || "Wrong pin" };
    } finally {
      setLoader(false);
    }
  };

  //logout

  const logout = async () => {
    try {
      setLoader(true);
      const res = await axiosPublic.post("/v1/logout", null, {
        withCredentials: true,
      });
      if (res?.data?.Status === "Success") {
        localStorage.removeItem("user"); // Clear user data from localStorage
        localStorage.removeItem("receiveUser"); // Clear send User
        localStorage.removeItem("sendAmount"); // clear amount
        localStorage.removeItem("cashoutAgent"); 
        localStorage.removeItem("cashoutAmount");
        localStorage.removeItem("cashinAgent");
        localStorage.removeItem("reqUser");
        localStorage.removeItem("cashinAmount");// clear amount
        setUser(null);
        toast.success("Logged out successfully");
      } else {
        toast.error(res?.data?.Status || "Logout failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to logout");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (receiveUser) {
      localStorage.setItem("receiveUser", JSON.stringify(receiveUser));
    } else {
      localStorage.removeItem("receiveUser");
    }

    if (sendAmount) {
      localStorage.setItem("sendAmount", JSON.stringify(sendAmount));
    } else {
      localStorage.removeItem("sendAmount");
    }

    if (cashoutAgent) {
        localStorage.setItem("cashoutAgent", JSON.stringify(cashoutAgent));
      } else {
        localStorage.removeItem("cashoutAgent");
      }

      if (cashoutAmount) {
        localStorage.setItem("cashoutAmount", JSON.stringify(cashoutAmount));
      } else {
        localStorage.removeItem("cashoutAmount");
      }

      if (cashinAgent) {
        localStorage.setItem("cashinAgent", JSON.stringify(cashinAgent));
      } else {
        localStorage.removeItem("cashinAgent");
      }

      if (cashinAmount) {
        localStorage.setItem("cashinAmount", JSON.stringify(cashinAmount));
      } else {
        localStorage.removeItem("cashinAmount");
      }

      if (reqUser) {
        localStorage.setItem("reqUser", JSON.stringify(reqUser));
      } else {
        localStorage.removeItem("reqUser");
      }

    setLoader(false);
  }, [receiveUser, sendAmount, cashoutAgent, cashinAgent, cashoutAmount, cashinAmount, reqUser]);

  // All values
  const allValues = {
    setUser,
    setLoader,
    loader,
    login,
    user,
    logout,
    sendAmount,
    setSendAmount,
    receiveUser,
    setReceiveUser,
    pinVerify,
    cashoutAgent,
    setCashoutAgent,
    cashinAgent,
     setCashinAgent,
     cashoutAmount,
    setCashoutAmount,
    cashinAmount, 
    setCashinAmount,
    reqUser, 
    setReqUser
  };

  return (
    <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
