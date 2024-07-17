
import Send from '../../../Common/Send';
import { FaDollarSign } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const CashoutAmount = () => {
    const {user,cashoutUser} = useAuth()
    const axiosPublic = useAxiosPublic()

    const { data: loger = [] } = useQuery({
        queryKey: ["cashout"],
        queryFn: async () => {
          const { data } = await axiosPublic.get('/v1/loger', {
            params: { email: user?.email },
            withCredentials: true
          });
          return data;
        },
        enabled: !!user?.email // Only execute the query if user?.email is truthy
      });
     
      const { data: singleAgent = [] } = useQuery({
        queryKey: ["singleAgent"],
        queryFn: async () => {
          const { data } = await axiosPublic.get('/v1/loger', {
            params: { email: cashoutUser?.email },
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
        console.log(data);
      }

    return (
        <div className="max-w-xl mx-auto h-screen border">
        <Send site={"cashout"} title={"Cash Out"} />
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
         {...register("sendAmount",{required: true})}
        className="block w-full px-4 py-2  border-[#EC1C24]  border-b-2   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300" type="number" placeholder="Amount" />


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

export default CashoutAmount;