import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root/Root";
import Home from "../components/Home/Home";
import Contect from "../components/Navber/Contect";
import About from "../components/Navber/About";
import AddProduct from "../components/Navber/AddProduct";
import ViewPrivate from "../components/Home/ViewPrivate";
import Private from "../components/PrivateRoute/Private";
import Login from "../components/page/SignIn/Login";
import SignUp from "../components/page/SignIn/SignUp";
import UserRegister from "../components/page/SignIn/UserRegister";
import AgentRegister from "../components/page/SignIn/AgentRegister";

const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
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
        path: '/login',
        element: <Login/>
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
       }
      ]
    },
  ]);

export default routes;