import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Send from "../../Common/Send";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const AllTrans = () => {
    const axiosSecure = useAxiosSecure()
    const { data: transHis = [] } = useQuery({
        queryKey: ["allTransHistory"],
        queryFn: async () => {
          const { data } = await axiosSecure(`/v1/allTransHistory`,{withCredentials: true});
          return data;
        },
      });
      
    return (
        <div>
        <div className="max-w-xl mx-auto  border">
          <Send site={'home'} title={"All Transaction"}/>
          
          

          <div className="">
            <h4 className="border-b-2 pl-8 py-4 font-semibold">All Contacts </h4>
            
           <div className=" mx-8">
           {
            transHis.map(i=> <div key={i.email} className=" border p-3 my-5 flex space-x-4">
               <img 
                className="h-14 w-14 rounded-full   "
                src={"https://i.ibb.co/VHD1J6g/user-profile-icon-free-vector.jpg" }
                alt=""
              />
              <div className="flex w-3/4 col-span-2 items-center text-center justify-between">
                <div  className="space-y-2">
                <span className="bg-red-300 p-1 text-white px-2 rounded-2xl ">Send By</span>
                <p> {i.senderName} </p>
                </div>

                <div  className="space-y-2">
                <span className="bg-pink-300 text-white p-1 px-2 rounded-2xl "> {i.method} </span>
                <p>{i.amount} </p>
                </div>
               <div  className="space-y-2">
               <span className="bg-green-400 text-white p-1 px-2 rounded-2xl ">Recived By</span>
               <p> {i.reciverName} </p>
               </div>
               
              </div>
            </div>)
           }
          
           </div>

          </div>
        </div>
      </div>
    );
};

export default AllTrans;