import { MdOutlineArrowForwardIos } from "react-icons/md";
import Send from "../../../Common/Send";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


const CashIn = () => {
    const {setCashinAgent} = useAuth()
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
  
  const { data: cashin = [] } = useQuery({
    queryKey: ["cashin"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/v1/allAgent`,{withCredentials: true});
      return data;
    },
  });
  
  const handleUserD = (i)=>{
   setCashinAgent(i)
    navigate('/cashinAmount')
  }
    return (
        <div>
        <div className="max-w-xl mx-auto min-h-screen  border">
          <Send site={''} title={"Cash In"}/>
          


          <div className="">
            <h4 className="border-b-2 pl-8 py-4  font-semibold">All Agents </h4>
            
           <div className=" mx-8">
           {
            cashin.map(i=> <div key={i.email} className=" my-5 flex space-x-4">
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

export default CashIn;