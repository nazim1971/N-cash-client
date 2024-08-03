import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Send from "../../../Common/Send";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const SendMoney = () => {

  const {setReceiveUser} = useAuth()
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
  
  const { data: sendUser = [] } = useQuery({
    queryKey: ["sendUser"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/v1/allUserForSend`,{withCredentials: true});
      return data;
    },
  });
  
  const handleUserD = (i)=>{
    setReceiveUser(i)
    navigate('/sendAmount')
  }
  
    return (
        <div>
          <div className="max-w-xl mx-auto  border">
            <Send site={'home'} title={"Send Money"}/>

            <div className="">
              <h4 className="border-b-2 pl-8 py-4 font-semibold">All Contacts </h4>
              
             <div className=" mx-8">
             {
              sendUser.map(i=> <div key={i.email} className="border my-5 flex space-x-4">
                 <img 
                  className="h-14 w-14 rounded-full   "
                  src={"https://i.ibb.co/VHD1J6g/user-profile-icon-free-vector.jpg" }
                  alt=""
                />
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

export default SendMoney;