
import Send from "../../../Common/Send";
import {  useNavigate } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";


const CashOut = () => {
        const {setCashoutAgent} = useAuth()
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
   setCashoutAgent(i)
    navigate('/cashoutAmount')
  }

    return (
        <div>
        <div className="max-w-xl mx-auto min-h-screen  border">
          <Send site={''} title={"Cash Out"}/>
          


          <div className="">
            <h4 className="border-b-2 pl-8 py-4 font-semibold">All Agents </h4>
            
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