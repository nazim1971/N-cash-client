import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root/Root";
import Home from "../components/Home/Home";
import Contect from "../components/Navber/Contect";
import About from "../components/Navber/About";
import AddProduct from "../components/Navber/AddProduct";
import ViewPrivate from "../components/Home/ViewPrivate";
import Private from "../components/PrivateRoute/Private";
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

const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement: <Error/> ,
      children: [
        {
          path: '/',
          element: <Home/>
        },
       {
        path: '/contect',
        element: <Contect/>
       },
       {
        path: '/about',
        element: <About/>
       },
       {
        path: '/loginE',
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
       {
        path: '/addProduct',
        element: <AddProduct/>
       },
       {
        path: '/viewPrivate',
        element: <Private><ViewPrivate/></Private>
       },
       //user send money
       {
        path: '/sendMoney',
        element: <SendMoney/>
       },
       {
        path: '/sendAmount',
        element: <SendAmount/>
       },
       {
        path:'/sendFinal',
        element: <SendFinal/>
       },
       // user cashOut
       {
        path: '/cashout',
        element: <CashOut/>
       }
      ]
    },
  ]);

export default routes;