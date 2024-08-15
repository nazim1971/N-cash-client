
import Send from "../../Common/Send";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();

  const [accountStatuses, setAccountStatuses] = useState({});
  const [userStatuses, setUserStatuses] = useState({});
  const [search, setSearch] = useState("");


  const { data: allUandA = [], refetch } = useQuery({
    queryKey: ["allUandA", search],
    queryFn: async () => {
      const { data } = await axiosSecure(`/v1/allUandA`, { params: {name: search},
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

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve"
    }).then(async(result) => {
      if (result.isConfirmed) {

        try {
          await axiosSecure.patch(
            '/v1/updateAccount',
            { email: item.email, status: updatedStatus},
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
        Swal.fire({
          title: "Approved!",
          text: "User account has been approved.",
          icon: "success"
        });
      }
    });
   
  };
  

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  return (
    <div>
      <div className="max-w-xl mx-auto  border">
        <Send site={"home"} title={"Manage User"} />

        <div className="">
        <div className="m-10">
          <div className="mb-2">
            <label className="pl-4 font-semibold ">Search</label>
          </div>
         <div className="flex items-center gap-2">
         <input
         value={search}
         onChange={ (e)=> e.target.value(setSearch) }
                 className="block w-full px-4 py-2  border-[#EC1C24]  border-b-2   focus:border   focus:outline-none " type="text" placeholder="Type User Name" />
         <Link> <button className="bg-[#EC1C24] h-8 w-8 rounded-full flex justify-center items-center"><FaArrowRight className=" text-white "/></button> </Link>
         </div>
          </div>
        
          <h4 className="border-b-2 my-2 pl-8 py-4 font-semibold">
            All Users and Agents{" "}
          </h4>

          <div className=" mx-8">
            {allUandA.map((i) => (
              <div key={i.email} className=" border p-3 my-5 flex space-x-4">
                <img
                  className="h-14 w-14 rounded-full   "
                  src={
                    "https://i.ibb.co/VHD1J6g/user-profile-icon-free-vector.jpg"
                  }
                  alt=""
                />
                <div className="flex w-3/4 col-span-2 items-center justify-between">
                  <div className="">
                  <p className="mb-2"> {i.name} </p>
                  <span className={`text-white py-1 px-2 rounded-xl ${i.role === 'agent' ? 'bg-red-300' : 'bg-blue-300' } `}> {i.role} </span>
                  </div>

                  <div className=" flex gap-2">
                  <button
                      className={`py-1 px-2 text-white rounded-2xl ${
                        userStatuses[i.email] === "pending" ? "bg-red-500" : " bg-slate-400 cursor-not-allowed"
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
