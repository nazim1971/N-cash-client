import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Send from "../../../Common/Send";



const UserReq = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: singleUserReq = [] } = useQuery({
        queryKey: ["singleUserReq"],
        queryFn: async () => {
          const { data } = await axiosSecure('/v1/getSingleUserReq', {
            params: { email: user?.email },
            withCredentials: true
          });
          return data;
        },
        enabled: !!user?.email // Only execute the query if user?.email is truthy
      });


    return (
        <div>
          <div className="max-w-xl mx-auto min-h-screen  border">
          <Send site={''} title={'All Request'} />
            


            <div className="">
              <h4 className="border-b-2 pl-8 py-4 font-semibold">All pending request </h4>
              
             <div className=" mx-8">
              { singleUserReq.length > 0 ?
              singleUserReq.map(i=> <div key={i._id} className="border my-5 flex space-x-4">
                 <img 
                  className="h-14 w-14 rounded-full   "
                  src={"https://i.ibb.co/VHD1J6g/user-profile-icon-free-vector.jpg" }
                  alt=""
                />
                <div className="flex w-3/4 col-span-2 items-center justify-between text-white">
                <p className="bg-blue-300 px-1 rounded-xl " > {i.reciverName} </p>
                <p className="bg-red-400 px-1 rounded-xl " >{i.method} </p>
                  
                  <p className="bg-green-500 px-1 rounded-xl "> {i.amount}$ </p>
                </div>
              </div>)
              :
              <div className="text-2xl text-stone-400 font-semibold min-h-screen flex justify-center items-center">
                No Request
              </div>
             }
            
             </div>

            </div>
          </div>
        </div>
    );
};

export default UserReq;