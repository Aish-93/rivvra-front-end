import React, { useContext, useState } from "react";
import { IoIosMail, IoMdLock } from "react-icons/io";
import LoginGoogle from "./LoginGoogle";
import { Button } from "antd";
import { Link, useNavigate } from "react-router";
import { EmailContext } from "./context/emailContext";
import { loginCall } from "../utils/methods/auth";
import { ClipLoader } from "react-spinners";
import { setItem, getItemUserAuth, setPass ,setUrl} from "../utils/methods/methods";
import Loader from "./Loader";
const LoginPage = () => {
  const navigate = useNavigate();
  const { setEmail,email,setDataBaseUrl } = useContext(EmailContext);

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlGoogleApi=(value)=>{
    // setEmail(value);
    setEmailId(value);
    setPassword("")
  } 
  const onLoginBtnClick = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    console.log(emailId, password, "test");

    const response = loginCall({
      emailId: emailId,
      password: password,
    });

    response.then((res) => {
      // saving on local storage
      if (res.message === "Login Successfull") {
         
        setItem(res);
        setPass(password);
        
        navigate("/");
        if (res.url) {
           setUrl(res.url)
          window.location.href = res.url;
        }
      }else{
        setIsLoading(false)
      }
    });
  };

  return (
    <div
      className="flex justify-center items-center
     py-30 "
    >
      {isLoading ? (
        <Loader />
      ) : (
        <fieldset className="border-2 border-blue-300 rounded-xl max-w-sm w-full p-6 shadow-md scale-125">
          <legend className="text-lg font-semibold text-gray-700">Login</legend>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className=" absolute left-3 top-[58%] transform  text-gray-400">
              <IoIosMail className="text-gray-500" />
            </span>
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span className="  absolute left-3 top-[56%] transform  text-gray-400">
              <IoMdLock className="text-gray-500" />
            </span>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            onClick={onLoginBtnClick}
          >
            Login
          </button>

          <div className="flex my-4">
            <input type="checkbox" className="mx-1" />
            <p className="mx-2"> Remember me</p>
          </div>
          <div className="flex justify-center bg-amber-300 rounded-md ">
            <p>Quickly Access</p>
          </div>
          <div className="flex py-5 justify-between cursor-pointer">
            <LoginGoogle  handlGoogleApi={handlGoogleApi} />
            <button className=" border-1 border-gray-200 px-2 rounded-md w-[160px] cursor-pointer">
              SSO
            </button>
          </div>
          <p className="ml-2">
            <Link to="/register">
              <Button>Don't have an account ?</Button>
            </Link>
          </p>
        </fieldset>
      )}
    </div>
  );
};

export default LoginPage;

//nav section
//login screen
// footer section

// same as pipe email password
