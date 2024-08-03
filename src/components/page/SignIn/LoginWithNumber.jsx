import {  useState } from "react";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {  FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";


const LoginWithNumber = () => {
  const {login,user} = useAuth()
  const navigate = useNavigate()

  
  // show password
  const [pass, setPass] = useState(false);

const {
  register,
  handleSubmit
} = useForm()
const onSubmit =async (data) => {
  const {number,pinNumber} = data
  const userInfo = {
    number,pinNumber
  }
  const res = await login(userInfo);
  if (res?.Status === "Success") {
    console.log(res.Status);
      navigate( "/home");
    }
}

 if(user) return navigate('/home')

    return (
      <div className="my-20">
      <div className="flex w-full border max-w-sm mx-auto overflow-hidden  rounded-lg shadow-lg  lg:max-w-4xl">
          <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: 'url(https://i.ibb.co/MfYyWhP/login.jpg)'}} ></div>
      
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
                 <Link to='/'> <img className="w-auto h-10 sm:h-12" src="https://i.ibb.co/GJg1fYZ/Brain-boost-removebg-preview.png" alt="" /></Link>
              </div>
      
              <p className="mt-3 text-xl text-center ">
                  Welcome back!
              </p>
      
          
      
              <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b  lg:w-1/4"></span>
      
                  <Link to='/' className="text-xs text-center text-red-500 font-semibold  uppercase hover:underline">login
                      with Email</Link>
      
                  <span className="w-1/5 border-b  lg:w-1/4"></span>
              </div>
      
              <form  onSubmit={handleSubmit(onSubmit)}>
      
              <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium " >Number</label>
                  <input
                  {...register("number",{required: true})}
                   className="block w-full px-4 py-2   border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300" type="number" placeholder="01XXXXXXXXX" />
              </div>
      
              <div className="mt-4">
                  <div className="flex justify-between">
                      <label className="block mb-2 text-sm font-medium " >Pin Number</label>
                      <a href="#" className="text-xs  hover:underline">Forget Password?</a>
                  </div>
      
                  <div className="flex items-center gap-5">
                  <input 
                   {...register("pinNumber",{required: true})}
                  id="loggingPassword" className="block w-full px-4 py-2  border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300" 
                  type={pass ? "text" : "password"} />
                  
                   <a onClick={() => setPass(!pass)} >
                    {pass ? <FaRegEye className="" /> : <FaRegEyeSlash />}
                  </a>
                  </div>
              </div>
      
              <div className="mt-6">
                  <button type="submit" className="w-full btn btn-primary px-6 py-3 text-sm font-medium tracking-wide  capitalize transition-colors duration-300 transform  rounded-lg  focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                      Sign In
                  </button>
              </div>
              </form>
      
              <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b  md:w-1/4"></span>
      
                  <Link to='/register' className="text-xs  uppercase  hover:underline text-rose-500">or sign up</Link>
      
                  <span className="w-1/5 border-b md:w-1/4"></span>
              </div>
          </div>
      </div> <ToastContainer/>
  </div>
    );
};

export default LoginWithNumber;