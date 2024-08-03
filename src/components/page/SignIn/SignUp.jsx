import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const SignUp = () => {
    
    const {user} = useAuth()
    const navigate = useNavigate()

    if(user) return navigate('/home')
    return (
        <div className="my-20">
        <div className=" p-5 w-full border my-20 max-w-sm mx-auto  rounded-lg shadow-lg  lg:max-w-4xl">
       
   <h1 className="my-10 text-center">Welcome to N-cash Business Dashboard</h1>
<div className="flex flex-col mx-3 gap-4 ">
    <Link to='/userRegister' className="btn"><button>User</button></Link>   
    <Link to='/agentRegister' className="btn"><button>Agent</button></Link>
</div>
     
       <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: 'url(https://i.ibb.co/F4SRb4t/sign-up.jpg)'}} ></div>
   </div>
 </div>
    );
};

export default SignUp;