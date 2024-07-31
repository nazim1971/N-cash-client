
import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import useSingleUser from "../Hooks/useSingleUser";



const Home = () => {
    const [isAmountShown, setIsAmountShown] = useState(false);
    const {user}  =useAuth()
    const {data: loger=[]} = useSingleUser({
        queryKey:["loger"], params:{email: user?.email}, enabled: !!user?.email
      })

      const handleClick = () => {
        setIsAmountShown(!isAmountShown); // Toggle the state
      };
      const text = isAmountShown ? `$${loger.amount}` : 'Tap for Balance'; 

    return (
        <div className="max-w-xl mx-auto h-screen border">
        <div className=" text-center space-y-2 py-5 text-2xl  px-10 bg-[#EC1C24] text-white ">
         <h2 className="font-semibold">N-Cash</h2>
        <p > {loger?.role} Dashboard </p>
        <hr />
        <p className=" font-semibold">Welcome {loger?.name} </p>
        {
            user?.role !== 'admin' && <p>
            <button onClick={handleClick} className="btn rounded-3xl text-[#EC1C24]"> {text} </button>
        </p>
        }
       </div>
       <div className="m-6 space-y-6">

        
       <div className="flex items-center gap-5  border p-4 ">
       <img 
                  className="h-14 w-14 rounded-full   "
                  src={"https://i.ibb.co/VHD1J6g/user-profile-icon-free-vector.jpg" }
                  alt=""
                />
            <div>
                <p> {loger.name} </p>
                <p> {loger.number} </p>
            </div>
        </div>
     
      
       </div>
    </div>
    );
};

export default Home;