import { FaDollarSign } from "react-icons/fa";
import Send from "../../../Common/Send";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useSingleUser from "../../../Hooks/useSingleUser";


const CashinAmount = () => {
   
  const {user,cashinAgent, setCashinAmount} = useAuth()
  const axiosPublic = useAxiosPublic()

  const {data: loger=[]} = useSingleUser({
    queryKey:["loger"], params:{email: user?.email}, enabled: !!user?.email
  })
   
    const { data: singleAgent = [] } = useQuery({
      queryKey: ["singleAgent"],
      queryFn: async () => {
        const { data } = await axiosPublic.get('/v1/loger', {
          params: { email: cashinAgent?.email },
          withCredentials: true
        });
        return data;
      },
      enabled: !!user?.email // Only execute the query if user?.email is truthy
    });
    
  const navigate = useNavigate();
  const {
      register,
      handleSubmit
    } = useForm()
    const onSubmit =async (data) => {
      let {cashinAmount} = data;
      cashinAmount = parseFloat(cashinAmount);
      setCashinAmount(cashinAmount)
      navigate('/cashinFinal')
    }
    return (
        <div className="max-w-xl mx-auto h-screen border">
        <Send site={"cashIn"} title={"Cash In"} />
        <div className="flex items-center gap-5  border p-4 m-6">
            <p className="bg-red-400 h-16 w-16 rounded-full"></p>
            <div>
                <p> {singleAgent.name} </p>
                <p> {singleAgent.number} </p>
            </div>
        </div>
       <form onSubmit={handleSubmit(onSubmit)}>
       <div className="mx-6 flex items-center gap-5">
        <FaDollarSign className="text-[#EC1C24]" />
        <input 
         {...register("cashinAmount",{required: true})}
        className="block w-full px-4 py-2  border-[#EC1C24]  border-b-2   focus:border-blue-400 focus:ring-opacity-40  focus:inline-none focus:ring focus:ring-blue-300" type="number" placeholder="Amount" />


        </div>
        <div className="m-8">
         <p className="font-semibold text-center">Available Balance: {loger?.amount} $.</p>
        </div>
        <div className="w-2/4 mx-auto">
            <button className="w-full p-5 rounded-2xl border border-[#ec1c24]">Next</button>
        </div>
       </form>
    </div>
    );
};

export default CashinAmount;