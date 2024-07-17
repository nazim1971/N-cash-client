import { Outlet } from "react-router-dom";
import Footer from "../Home/Footer";
import Navber from "../Navber/Navber";

const Root = () => {
    return (
        <div className="min-h-screen" >
            <div className=" w-[94%] mx-auto ">
            <Navber/>
            <Outlet/>
            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default Root;