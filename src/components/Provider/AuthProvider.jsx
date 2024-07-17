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

  const [sendUser, setSendUser] = useState(() => {
    const storedSendUser = localStorage.getItem("sendUser");
    return storedSendUser ? JSON.parse(storedSendUser) : null;
  });

  const [cashoutUser, setCashoutUser] = useState(() => {
    const storedAmount = localStorage.getItem("cashoutUser");
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
        localStorage.removeItem("sendUser"); // Clear send User
        localStorage.removeItem("sendAmount"); // clear amount
        localStorage.removeItem("cashoutUser"); // clear amount
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

    if (sendUser) {
      localStorage.setItem("sendUser", JSON.stringify(sendUser));
    } else {
      localStorage.removeItem("sendUser");
    }

    if (sendAmount) {
      localStorage.setItem("sendAmount", JSON.stringify(sendAmount));
    } else {
      localStorage.removeItem("sendAmount");
    }

    if (cashoutUser) {
        localStorage.setItem("cashoutUser", JSON.stringify(cashoutUser));
      } else {
        localStorage.removeItem("cashoutUser");
      }

    setLoader(false);
  }, [sendUser, sendAmount,cashoutUser]);

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
    sendUser,
    setSendUser,
    pinVerify,
    cashoutUser,
    setCashoutUser,
  };

  return (
    <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
