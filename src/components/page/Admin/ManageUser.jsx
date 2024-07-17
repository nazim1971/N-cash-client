
import Send from "../../Common/Send";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();

  const [accountStatuses, setAccountStatuses] = useState({});
  const [userStatuses, setUserStatuses] = useState({});

  const { data: allUandA = [] } = useQuery({
    queryKey: ["allUandA"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/v1/allUandA`, {
        withCredentials: true,
      });
      const initialAccountStatuses = data.reduce((acc, user) => {
        acc[user.email] = user.account;
        return acc;
      }, {});
      const initialUserStatuses = data.reduce((acc, user) => {
        acc[user.email] = user.status;
        return acc;
      }, {});
      setAccountStatuses(initialAccountStatuses);
      setUserStatuses(initialUserStatuses);
      return data;
    },
  });
  
  // update account status
  const handleAccountChange = async (e, item) => {
    const updatedAccount = e.target.value;
    try {
      await axiosSecure.patch(
        '/v1/updateAccount',
        { email: item.email, account: updatedAccount },
        { withCredentials: true }
      );
      setAccountStatuses((prev) => ({
        ...prev,
        [item.email]: updatedAccount,
      }));
      console.log(`Account status for ${item.name} updated to: ${updatedAccount}`);
    } catch (error) {
      console.error('Error updating account status:', error);
    }
  };

   // Update user status
   const handleStatusChange = async (item) => {
    const updatedStatus = userStatuses[item.email] === "pending" ? "approved" : "pending";
    try {
      await axiosSecure.patch(
        '/v1/updateAccount',
        { email: item.email, status: updatedStatus },
        { withCredentials: true }
      );
      setUserStatuses((prev) => ({
        ...prev,
        [item.email]: updatedStatus,
      }));
      console.log(`Status for ${item.name} updated to: ${updatedStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <div className="max-w-xl mx-auto  border">
        <Send site={""} title={"Manage User"} />

        <div className="">
          <h4 className="border-b-2 my-2 pl-8 pb-4 font-semibold">
            All Users and Agents{" "}
          </h4>

          <div className=" mx-8">
            {allUandA.map((i) => (
              <div key={i.email} className=" my-5 flex space-x-4">
                <img
                  className="h-14 w-14 rounded-full   "
                  src={
                    "https://i.ibb.co/VHD1J6g/user-profile-icon-free-vector.jpg"
                  }
                  alt=""
                />
                <div className="flex w-3/4 col-span-2 items-center justify-between">
                  <p> {i.name} </p>

                  <div className=" flex gap-2">
                  <button
                      className={`py-1 px-2 text-white rounded-2xl ${
                        userStatuses[i.email] === "pending" ? "bg-red-500" : "bg-green-600 cursor-not-allowed"
                      }`}
                      disabled={userStatuses[i.email] === "approved"}
                      onClick={() => handleStatusChange(i)}
                    >
                      {userStatuses[i.email]}
                    </button>
                    <select
                      className={`py-1 px-2 text-white rounded-2xl ${
                        accountStatuses[i.email] === "block"
                          ? "bg-red-500"
                          : "bg-green-600"
                      }`}
                      value={accountStatuses[i.email] || i.account}
                      onChange={(e) => handleAccountChange(e, i)}
                    >
                      <option value="active">Active</option>
                      <option value="block">Block</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
