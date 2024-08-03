
import {  NavLink } from "react-router-dom";

import 'react-tooltip/dist/react-tooltip.css'
import "animate.css";
import useSingleUser from "../Hooks/useSingleUser";
import useAuth from "../Hooks/useAuth";


const Navber = () => {


  const {user}  = useAuth();
  const {data: loger=[]} = useSingleUser({
    queryKey:["loger"], params:{email: user?.email}, enabled: !!user?.email
  })
    const menu = <>
    {loger?.role === 'user' && (
        <>
          
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

          <p>
            <NavLink to="/userReq">
            <img className="mx-auto" src='req.png' alt="" />
            </NavLink>
            <span>All Request</span>
          </p>

          <p>
            <NavLink to="/userTransHistory">
            <img className="mx-auto" src='trans.png' alt="" />
            </NavLink>
            <span>Transactions</span>
          </p>
        </>
      )}
      {loger?.role === 'agent' && (
        <>
        <p>
            <NavLink to="/agentPendingReq">All Request</NavLink>
          </p>
          <p>
            <NavLink to="/agentTransHistory">Transactions</NavLink>
          </p>
        </>
      )}

    {loger?.role === 'admin' && (
        <>
        <p>
            <NavLink to="/manageUser">Manage User </NavLink>
          </p>
          <p>
            <NavLink to="/allTrans">All Transaction </NavLink>
          </p>
        </>
      )}
    </>



    return (
        <div>
            <div className="">
      
      <div className="navM flex flex-wrap gap-2">
        {menu}
      </div>
  

</div>
        </div>
    );
};

export default Navber;