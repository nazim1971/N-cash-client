import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import Send from "../../../Common/Send";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";


const CashOut = () => {
        const {setCashoutUser} = useAuth()
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
  
  const { data: cashOut = [] } = useQuery({
    queryKey: ["cashOut"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/v1/allAgent`,{withCredentials: true});
      return data;
    },
  });
  
  const handleUserD = (i)=>{
   setCashoutUser(i)
    navigate('/cashoutAmount')
  }

    return (
        <div>
        <div className="max-w-xl mx-auto min-h-screen  border">
          <Send site={''} title={"Cash Out"}/>
          
          <div className="m-10">
          <div className="mb-2">
            <label className="pl-4 ">Recipient</label>
          </div>
         <div className="flex items-center gap-2">
         <FaPhoneAlt className="text-[#EC1C24] text-xl " />

         <input
                 className="block w-full px-4 py-2  border-[#EC1C24]  border-b-2   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300" type="number" placeholder="01XXXXXXXXX" />
         <Link> <button className="bg-[#EC1C24] h-8 w-8 rounded-full flex justify-center items-center"><FaArrowRight className=" text-white "/></button> </Link>
         </div>
         <h1 className="pl-4 pt-4">
         Enter Name, 11-digit Mobile Number.
         </h1>
          </div>

          <div className="">
            <h4 className="border-b-2 pl-8 pb-4 font-semibold">All Agents </h4>
            
           <div className=" mx-8">
           {
            cashOut.map(i=> <div key={i.email} className=" my-5 flex space-x-4">
              <p className="h-16 w-16 rounded-full bg-red-300"></p>
              <div className="flex w-3/4 col-span-2 items-center justify-between">
                <p> {i.name} </p>
               <button onClick={()=> handleUserD(i)}>
               <MdOutlineArrowForwardIos/>
               </button>
              </div>
            </div>)
           }
          
           </div>

          </div>
        </div>
      </div>
    );
};

export default CashOut;