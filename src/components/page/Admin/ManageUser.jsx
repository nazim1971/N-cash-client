
import Send from "../../Common/Send";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [accountStatuses, setAccountStatuses] = useState({});

  const { data: allUandA = [] } = useQuery({
    queryKey: ["allUandA"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/v1/allUandA`, {
        withCredentials: true,
      });
      return data;
    },
  });

  // update account 
  const handleAccountChange = async(e, item) => {
    const updatedAccount = e.target.value;
    await axiosSecure.patch('/v1/updateAccount',{email: item?.email , amount: updatedAccount}, {withCredentials: true} )
    console.log(`Account status for ${item.name} updated to: ${updatedAccount}`);
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
                    <p
                      className={` py-1 px-2 text-white rounded-2xl ${
                        i?.status === "pending" ? " bg-red-500" : "bg-green-600"
                      } `}
                    >
                      {" "}
                      {i?.status}{" "}
                    </p>
                    <select
                      className={`py-1 px-2 text-white rounded-2xl ${
                        i?.account === "block" ? "bg-red-500" : "bg-green-600"
                      }`}
                      defaultValue={i?.account}
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
