
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useSingleUser from "../Hooks/useSingleUser";
import Navber from "../Navber/Navber";
import { Link, NavLink, useNavigate } from "react-router-dom";



const Home = () => {



  const nagivate = useNavigate();

  const {user, logout}  = useAuth();
  const handleLogout =async ()=>{
  await logout();
  nagivate('/');
  }
    const [isAmountShown, setIsAmountShown] = useState(false);
    const {data: loger=[]} = useSingleUser({
        queryKey:["loger"], params:{email: user?.email}, enabled: !!user?.email
      })

      const handleClick = () => {
        setIsAmountShown(!isAmountShown); // Toggle the state
      };
      const text = isAmountShown ? `$${loger.amount}` : 'Tap for Balance'; 




          // dark and light mode 
    const [theme, setTheme] = useState(() => {
      const storedTheme = localStorage.getItem('light');
      return storedTheme || 'light';
  });
  
  useEffect(() => {
      localStorage.setItem('theme', theme);
      document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);
  
  const handleToggle = (e) => {
      if (e.target.checked) {
          setTheme('dark');
      } else {
          setTheme('light');
      }
  };
    return (
        <div className="max-w-xl mx-auto min-h-screen border">
        <div className=" text-center space-y-2 py-5 text-2xl  px-10 bg-[#EC1C24] text-white ">
        <div className="flex justify-between">
         <h2 className="font-semibold ">N-Cash</h2> 
         <div >




        {/* user picture and logout/login btn */}
        {user ? (
          <div className="flex gap-3 items-center z-[1000] ">
            <label className="swap mr-4 swap-rotate">

{/* this hidden checkbox controls the state */}
<input onChange={handleToggle} type="checkbox" value='synthwave' />

{/* sun icon */}
<svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>

{/* moon icon */}
<svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>

</label>
            <div> 
              <button
              onClick={handleLogout}
              className="btn bg-blue-500 border-none text-white"
            >
              Logout
            </button>
            </div>
            
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/loginE" className="btn bg-green-500 text-white">
              Login
            </Link>
            <Link to="/register" className="btn text-green-500 ">
              Register
            </Link>
          </div>
        )}
      </div>
          </div> 
        {
          user && <>
          <p > {loger?.role} Dashboard </p>
        <hr />
        <p className=" font-semibold">Welcome {loger?.name} </p>
        {
            user?.role !== 'admin' && <p>
            <button onClick={handleClick} className="btn rounded-3xl text-[#EC1C24]"> {text} </button>
        </p>
        }
          </>
        }
       </div>
       <div className="m-6 space-y-6">

        
      {user ? <div className="flex items-center gap-5  border p-4 ">
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
        :
        <div className="navM flex gap-2">
           <p>
           <NavLink to="/sendMoney">
            <img className="mx-auto" src='sendMoney.png' alt="" />
            </NavLink>
            <span>Send Money</span>
           </p>
          
           <p>
           <NavLink to="/cashout">
            <img className="mx-auto" src='cashOut.png' alt="" />
            </NavLink>
            <span>Cash-Out</span>
           </p>

           <p>
           <NavLink to="/cashin">
            <img className="mx-auto" src='cashIn.png' alt="" />
            </NavLink>
            <span>Cash-In</span>
           </p>
        </div>
        }
         <Navber/>
      
       </div>
    </div>
    );
};

export default Home;