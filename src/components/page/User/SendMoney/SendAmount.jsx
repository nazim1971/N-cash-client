import { FaDollarSign } from "react-icons/fa";
import Send from "../../../Common/Send";
import {useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useSingleUser from "../../../Hooks/useSingleUser";


const SendAmount = () => {
    const {receiveUser,setSendAmount,user} = useAuth();
     
    const {data: loger=[]} = useSingleUser({
      queryKey:["loger"], params:{email: user?.email}
    })

      const {data: reciver=[]} = useSingleUser({
        queryKey:["reciver"], params:{email: receiveUser?.email}
      })
 
    const navigate = useNavigate();
    const {
        register,
        handleSubmit
      } = useForm()
      const onSubmit =async (data) => {
      
        let {sendAmount} = data;
        sendAmount = parseFloat(sendAmount);
        if(sendAmount > 100){
            sendAmount+=5;
        }
        setSendAmount(sendAmount)
        if( loger?.amount < 50 || sendAmount > loger?.amount ) return toast.error('Insufficient Balance')
            if( sendAmount < 50 ) return toast.error('minimun tranfer balance 50$')
        navigate('/sendFinal')
    }
    return (
        <div className="max-w-xl mx-auto h-screen border">
            <Send site={"sendMoney"} title={"Send Money"} />
            <div className="flex items-center gap-5  border p-4 m-6">
                <p className="bg-red-400 h-16 w-16 rounded-full"></p>
                <div>
                    <p> {reciver.name} </p>
                    <p> {reciver.number} </p>
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

export default SendAmount;