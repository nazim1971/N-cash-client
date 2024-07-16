import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


const Send = ({site, title}) => {
    return (
        <div className="h-20 grid grid-cols-3 items-center px-10 bg-[#EC1C24] text-white ">
        <Link to={`/${site}`}> <FaArrowLeft className="text-xl" />
        </Link>
        <p className="text-center">{title} </p>
       </div>
    );
};

export default Send;