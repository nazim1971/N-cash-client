import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="min-h-screen" >
            <div className=" w-[94%] mx-auto ">
            <Outlet/>
            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default Root;