import { useQuery } from "@tanstack/react-query";
import Send from "../../../Common/Send";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useSingleUser from "../../../Hooks/useSingleUser";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AgentPendingReq = () => {
  const { user,reqUser, setReqUser } = useAuth();
  const axiosSecure = useAxiosSecure();
 
  const { data: loger = [] } = useSingleUser({
    queryKey: ["loger"],
    params: { email: user?.email },
    enabled: !!user?.email
  });

  const { data: singleAgentReq = [], refetch } = useQuery({
    queryKey: ["singleAgentReq", user],
    queryFn: async () => {
      const { data } = await axiosSecure("/v1/getSingleUserReq", {
        params: { email: user?.email },
        withCredentials: true,
      });
      return data;
    },
    enabled: !!user?.email, // Only execute the query if user?.email is truthy
  });

  const { data: senderE = [] } = useSingleUser({
    queryKey: ["senderE", reqUser],
    params: { email: reqUser },
    enabled: !!reqUser,
  });
  console.log(senderE?.amount);

  const handleAccept = async (i) => {
   await setReqUser(i?.senderEmail);
    console.log("im");
    if (i.method === "Cash-In") {
      if (loger?.amount < i.amount) return toast.error("Insufficient Balance");
      else {
        const updatedAm = loger?.amount - i.amount;
        const updateSenderAm = parseFloat(senderE?.amount) + i.amount;
        console.log(updateSenderAm , updatedAm);
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes Cash-In",
        }).then(async (result) => {
          if (result.isConfirmed) {
         
            await axiosSecure.patch(
              "/v1/updateSender",
              { email: loger?.email, amount: updatedAm },
              { withCredentials: true }
            );

            await axiosSecure.patch(
              "/v1/updateSender",
              { email: senderE?.email, amount: updateSenderAm },
              { withCredentials: true }
            );
            await axiosSecure.patch(
              "/v1/updateStatus",
              { id: i._id, status: "success" },
              { withCredentials: true }
            );
             refetch()
          
            Swal.fire({
              title: "Cash-In!",
              text: "Cash-In has been done.",
              icon: "success",
            });
          }
        });
      }
    }
    else if (i.method === "Cash-Out"){
      if (senderE?.amount < i.amount) return toast.error("Insufficient Balance");
      else {
        const updatedAm = loger?.amount + i.amount;
        const updateSenderAm = parseFloat(senderE?.amount) - i.amount;
        console.log(updateSenderAm , updatedAm);
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes Cash-Out!",
        }).then(async(result) => {
          if (result.isConfirmed) {
           
            await axiosSecure.patch(
              "/v1/updateSender",
              { email: loger?.email, amount: updatedAm },
              { withCredentials: true }
            );

            await axiosSecure.patch(
              "/v1/updateSender",
              { email: senderE?.email, amount: updateSenderAm },
              { withCredentials: true }
            );
            await axiosSecure.patch(
              "/v1/updateStatus",
              { id: i._id, status: "success" },
              { withCredentials: true }
            );
             refetch()
          
            Swal.fire({
              title: "Cash-Out",
              text: "Cash-Out has been done.",
              icon: "success",
            });
          }
        });
      }
    }
  };
  


  return (
    <div className="max-w-xl min-h-screen mx-auto  border">
      <Send site={"home"} title={"All Request"} />

      <div className="">
        <h4 className="border-b-2 pl-8 py-4 font-semibold">
          All pending request{" "}
        </h4>

        <div className=" mx-8">
          { singleAgentReq.length > 0 ? 
          singleAgentReq.map((i) => (
            <div key={i._id} className="border my-5 flex space-x-4">
              <img
                className="h-14 w-14 rounded-full   "
                src={
                  "https://i.ibb.co/VHD1J6g/user-profile-icon-free-vector.jpg"
                }
                alt=""
              />
              <div className="flex w-3/4 col-span-2 items-center justify-between text-white">
                <p className="bg-blue-300 px-1 rounded-xl "> {i.senderName} </p>
                <p className="bg-red-400 px-1 rounded-xl ">{i.method} </p>

                <p className="bg-green-500 px-1 rounded-xl "> {i.amount}$ </p>
                <button
                  onClick={() => handleAccept(i)}
                  className="btn btn-sm text-white bg-blue-500 "
                >
                  Accept
                </button>
              </div>
            </div>
          ))
          :
          <div className="text-2xl text-stone-400 font-semibold min-h-screen flex justify-center items-center">
            No Request
          </div>
        }
        </div>
      </div>
    </div>
  );
};

export default AgentPendingReq;
