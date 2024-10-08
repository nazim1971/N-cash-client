import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root/Root";
import Home from "../components/Home/Home";
import SignUp from "../components/page/SignIn/SignUp";
import UserRegister from "../components/page/SignIn/UserRegister";
import AgentRegister from "../components/page/SignIn/AgentRegister";
import LoginWithEmail from "../components/page/SignIn/LoginWithEmail";
import LoginWithNumber from "../components/page/SignIn/LoginWithNumber";
import Error from "./Error";
import SendMoney from "../components/page/User/SendMoney/SendMoney";
import SendAmount from "../components/page/User/SendMoney/SendAmount";
import SendFinal from "../components/page/User/SendMoney/SendFinal";
import CashOut from "../components/page/User/CashOut/CashOut";
import CashoutAmount from "../components/page/User/CashOut/CashoutAmount";
import CashIn from "../components/page/User/CashIn/CashIn";
import Private from "./Private";
import UserRoute from "./UserRoute";
import UserReq from "../components/page/User/Request/UserReq";
import UserTransHistory from "../components/page/User/TransHistory/UserTransHistory";
import AgentRoute from "./AgentRoute";
import AgentTransHistory from "../components/page/Agent/AgentTransHistory/AgentTransHistory";
import AdminRoute from "./AdminRoute";
import ManageUser from "../components/page/Admin/ManageUser";
import AllTrans from "../components/page/Admin/AllTrans";
import CashinAmount from "../components/page/User/CashIn/CashinAmount";
import CashoutFinal from "../components/page/User/CashOut/CashoutFinal";
import CashinFinal from "../components/page/User/CashIn/CashinFinal";
import AgentPendingReq from "../components/page/Agent/AllPendingReq/AgentPendingReq";

const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement: <Error/> ,
      children: [
        {
          path: '/home',
          element: <Home/>
        },
       {
        path: '/',
        element: <LoginWithEmail/>
       },
       {
        path: '/loginN',
        element: <LoginWithNumber/>
       },
       {
        path: '/register',
        element: <SignUp/>
       },
       {
        path: '/userRegister',
        element: <UserRegister/>
       },
       {
        path: '/agentRegister',
        element: <AgentRegister/>
       }
       ,
       //user related routes
       {
        path: '/sendMoney',
        element: <Private> <UserRoute><SendMoney/></UserRoute> </Private>
       },
       {
        path: '/sendAmount',
        element: <Private> <UserRoute><SendAmount/></UserRoute> </Private>
       },
       {
        path:'/sendFinal',
        element: <Private> <UserRoute><SendFinal/></UserRoute> </Private>
       },
       {
        path: '/cashout',
        element: <Private> <UserRoute><CashOut/></UserRoute> </Private>
       },
       {
        path: '/cashoutAmount',
        element: <Private> <UserRoute><CashoutAmount/></UserRoute> </Private>
       },
       {
        path: '/cashoutFinal',
        element: <Private> <UserRoute> <CashoutFinal/> </UserRoute> </Private>
       },
       {
        path: '/userReq',
        element: <Private> <UserRoute> <UserReq/> </UserRoute> </Private>
       },
       {
        path: '/cashIn',
        element: <Private> <UserRoute> <CashIn/> </UserRoute> </Private>
       },
       {
        path: '/cashinAmount',
        element: <Private> <UserRoute> <CashinAmount/> </UserRoute> </Private>
       },
       {
        path: '/cashinFinal',
        element: <Private> <UserRoute> <CashinFinal/> </UserRoute> </Private>
       }
       ,
       {
        path: '/userTransHistory',
        element: <Private> <UserRoute> <UserTransHistory/> </UserRoute> </Private>
       },
       // end user related Routes

       // start Agent related route
       {
        path: '/agentPendingReq',
        element: <Private> <AgentRoute> <AgentPendingReq/> </AgentRoute> </Private>
       },
       {
        path: '/agentTransHistory',
        element: <Private> <AgentRoute> <AgentTransHistory/> </AgentRoute> </Private>
       },
       // End agent related route
       {
        path: '/manageUser',
        element: <Private> <AdminRoute> <ManageUser/> </AdminRoute> </Private>
       },
       {
        path: '/allTrans',
        element: <Private> <AdminRoute> <AllTrans/> </AdminRoute> </Private>
       }
      ]
    },
  ]);

export default routes;