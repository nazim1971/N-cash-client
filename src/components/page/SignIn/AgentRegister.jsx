import { Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";

const AgentRegister = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()
  const onSubmit = (data) => {
    const {name,email,number,pinNumber} = data


    // password validation
    if (pinNumber.length < 5 && pinNumber.length > 5) {
      setError("pinNumber", {
        type: "manual",
        message: "Pin Number must be 5 digit long."
    })
    return
  }



  }

  return (
    <div className="my-20">
           <div className="flex w-full border my-20 max-w-sm mx-auto overflow-hidden  rounded-lg shadow-lg  lg:max-w-4xl">
          
      
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <div className="flex justify-center mx-auto">
                  <img className="w-auto h-10 sm:h-12" src="https://i.ibb.co/GJg1fYZ/Brain-boost-removebg-preview.png" alt="" />
              </div>
      
              <p className="mt-3 text-xl text-center ">
             Welcome to N-cash Agent Dashboard
              </p>
              <form  onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium " >Name</label>
                  <input
                  {...register("name",{required: true})}
                   className="block w-full px-4 py-2   border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Name" />
              </div>
              <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium " >Email Address</label>
                  <input
                  {...register("email",{required: true})}
                   className="block w-full px-4 py-2   border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" />
              </div>
              
              <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium " >Mobile Number</label>
                  <input
                  {...register("number",{required: true})}
                   className="block w-full px-4 py-2   border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300" type="number" placeholder="01XXXXXXXXX" />
              </div>
      
              <div className="mt-4">
                  <div className="flex justify-between">
                      <label className="block mb-2 text-sm font-medium " >Pin Number</label>
                      <a href="#" className="text-xs  hover:underline">Forget Password?</a>
                  </div>
      
                  <div >
                 <div className="flex items-center gap-5">
                 <input 
                   {...register("pinNumber",{required: true})}
                   className="block w-full px-4 py-2  border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300" 
                  type='password' placeholder="*****"  />
                  
                   
                 </div>
                 {errors.pinNumber && (
                  <span className="text-red-600 text-center font-semibold p-1">
                    {errors.pinNumber.message}{" "}
                  </span>
                )}
                  </div>
              </div>
      
              <div className="mt-6">
                  <button type="submit" className="w-full btn btn-primary px-6 py-3 text-sm font-medium tracking-wide  capitalize transition-colors duration-300 transform  rounded-lg  focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                      Register
                  </button>
              </div>
              </form>
      
              <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b  md:w-1/4"></span>
      
                  <Link to='/login' className="text-xs  uppercase  hover:underline text-rose-500">or sign in</Link>
      
                  <span className="w-1/5 border-b md:w-1/4"></span>
              </div>
          </div>
          <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: 'url(https://i.ibb.co/F4SRb4t/sign-up.jpg)'}} ></div>
      </div>
    </div>
  );
};

export default AgentRegister;
