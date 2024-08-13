import { Outlet } from "react-router-dom";
import {CookieConsent} from "react-cookie-consent"

const Root = () => {
    return (
        <div className="min-h-screen" >
            <div className=" w-[94%] mx-auto ">
            <CookieConsent
        location="bottom"
        buttonText="Accept Cookies"
        cookieName="userConsent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={365}
      >
        This website uses cookies to enhance the user experience.{" "}
        <span style={{ fontSize: "10px" }}>You can accept by clicking the button.</span>
      </CookieConsent>
            <Outlet/>
            </div>
        </div>
    );
};

export default Root;