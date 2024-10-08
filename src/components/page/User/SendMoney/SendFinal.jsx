import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Send from "../../../Common/Send";
import {   useEffect, useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import {  useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useSingleUser from "../../../Hooks/useSingleUser";


const SendFinal = () => {
    const {sendAmount,user,receiveUser, pinVerify} = useAuth();
    const [pass, setPass] = useState(false);
    const [charge, setCharge] = useState(0);
    const [uiAm, setUiAm] = useState(0)
    const navigate = useNavigate();
     const axiosPublic = useAxiosPublic()
 
    useEffect(()=>{
       const storegAm =  parseInt(sendAmount)
        setUiAm(storegAm);
        if(storegAm > 100){
            setUiAm(storegAm - 5)
            setCharge(5)
        }
    },[])

    const {data: loger=[]} = useSingleUser({
      queryKey:["loger"], params:{email: user?.email}, enabled: !!user?.email
    })

      const {data: reciver=[]} = useSingleUser({
        queryKey:["reciver"], params:{email: receiveUser?.email}, enabled: !!receiveUser?.email
      })


    const {
        register,
        handleSubmit
      } = useForm()
      const onSubmit =async (i) => {
        const {pinNumber} = i
        const mainAm =parseInt(loger?.amount)
        const convertedAm =  parseInt(sendAmount)
        const updatedAm = mainAm-convertedAm;
         const transInfo ={
            status:"success",
            method: 'Send-Money',
            amount: convertedAm,
            senderEmail: user?.email,
            senderName: user?.name ,
            reciverEmail: receiveUser?.email,
            reciverName: receiveUser?.name
         }
         const input = {
            email: user?.email,
            pinNumber: pinNumber
         }
         const updateReciver = parseFloat(reciver.amount) + convertedAm;
        
          const pin = await pinVerify(input);
          if(pin.Status === "Success"){
            await axiosPublic.patch('/v1/updateSender',{email: user?.email , amount: updatedAm}, {withCredentials: true} )
            await axiosPublic.patch('/v1/updateSender',{email: reciver?.email , amount: updateReciver}, {withCredentials: true} )
        const {data} = await axiosPublic.post('/v1/sendTrans', transInfo, {withCredentials: true})
        console.log(data);
        if (data.insertedId) {
          
           toast.success("Send Money Complete");
           navigate('/home')
         }
          }

      }
    return (
        <div className="max-w-xl mx-auto h-screen border">
            <Send site={'sendAmount'} title={"Send Money"} />
           <div className="m-6 space-y-6">
           <div className="flex items-center gap-5  border p-4 ">
                <p className="bg-red-400 h-16 w-16 rounded-full"></p>
                <div>
                    <p> {reciver.name} </p>
                    <p> {reciver.number} </p>
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

export default SendFinal;