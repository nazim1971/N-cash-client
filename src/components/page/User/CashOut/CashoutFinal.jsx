import { RiLockPasswordLine } from "react-icons/ri";
import Send from "../../../Common/Send";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";


const CashoutFinal = () => {

    const {cashoutAmount,user,cashoutAgent, pinVerify} = useAuth();
    const [pass, setPass] = useState(false);
    const [charge, setCharge] = useState(0);
    const [uiAm, setUiAm] = useState(0)
    const navigate = useNavigate();
     const axiosPublic = useAxiosPublic()
 
    useEffect(()=>{
        setUiAm(cashoutAmount);
        if(cashoutAmount){
            const charge = cashoutAmount / 100 * 1.5;
            setUiAm(Math.round(cashoutAmount - charge))
            setCharge(Math.round(charge*2)/2)
        }
    },[])


    const { data: singleAgent = [] } = useQuery({
        queryKey: ["singleAgent"],
        queryFn: async () => {
          const { data } = await axiosPublic.get('/v1/loger', {
            params: { email: cashoutAgent?.email },
            withCredentials: true
          });
          return data;
        },
        enabled: !!user?.email // Only execute the query if user?.email is truthy
      });


    const {
        register,
        handleSubmit
      } = useForm()
      const onSubmit =async (i) => {
        const {pinNumber} = i
         const transInfo ={
            status:"pending",
            method: 'Cash-Out',
            amount: cashoutAmount,
            senderEmail: user?.email,
            senderName: user?.name ,
            reciverEmail: singleAgent?.email,
            reciverName: singleAgent?.name
         }
         const input = {
            email: user?.email,
            pinNumber: pinNumber
         }
        
          const pin = await pinVerify(input);
          if(pin.Status === "Success"){
        const {data} = await axiosPublic.post('/v1/sendTrans', transInfo, {withCredentials: true})
        console.log(data);
        if (data.insertedId) {
          
           toast.success("Cash-Out Request Send");
           navigate('/home')
         }
          }

      }

    return (
        <div className="max-w-xl mx-auto h-screen border">
        <Send site={'cashoutAmount'} title={"Cash-Out"} />
       <div className="m-6 space-y-6">
       <div className="flex items-center gap-5  border p-4 ">
            <p className="bg-red-400 h-16 w-16 rounded-full"></p>
            <div>
                <p> {singleAgent.name} </p>
                <p> {singleAgent.number} </p>
            </div>
        </div>
        <div className="font-semibold grid grid-cols-2 p-4  border text-center  justify-between">
            <p>{uiAm} $ <br /> <span className="text-red-500">Amount</span> </p>
            <p> {charge} $ <br /> <span className="text-red-500">Charge</span> </p>
        </div>
       <form onSubmit={handleSubmit(onSubmit)}>
       <div className="flex items-center gap-5">
        <RiLockPasswordLine className="text-xl" />

              <input 
              {...register("pinNumber",{required: true})}
               className="block w-full px-4 py-2  border-b-2 " 
              type={pass ? "text" : "password"} />
              
               <a onClick={() => setPass(!pass)} >
                {pass ? <FaRegEye className="" /> : <FaRegEyeSlash />}
              </a>
              </div>
              <div className="w-2/4 mx-auto">
            <button className="w-full p-5 rounded-2xl border border-[#ec1c24]">Send</button>
        </div>
       </form>
       </div>
    </div>
    );
};

export default CashoutFinal;