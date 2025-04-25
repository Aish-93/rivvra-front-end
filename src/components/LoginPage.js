import React from "react";
import { IoIosMail, IoMdLock } from "react-icons/io";
import LoginGoogle from "./LoginGoogle";
import { Button } from "antd";
import { Link } from "react-router";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center
     py-30 ">
      <fieldset className="border-2 border-gray-300 rounded-xl max-w-sm w-full p-6 shadow-md">
        <legend className="text-lg font-semibold text-gray-700">Login</legend>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>

          <input
            type="email"
            placeholder="Email"
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
            className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="  absolute left-3 top-[56%] transform  text-gray-400">
            <IoMdLock className="text-gray-500" />
          </span>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Login
        </button>

        <div className="flex my-4">
          <input type="checkbox" className="mx-1" />
          <p className="mx-2"> Remember me</p>
        </div>
        <div className="flex justify-center bg-amber-300 rounded-md ">
          <p>Quickly Access</p>
        </div>
        <div className="flex py-5 justify-center cursor-pointer">
          <LoginGoogle />
          <button className=" border-1 px-1 rounded-md w-[160px] cursor-pointer">
            SSO
          </button>
        </div>
        <p>
            <Link to="/register">
            <Button>Don't have an account ?</Button> 
            </Link>
            </p>
      </fieldset>
      
    </div>
  );
};

export default LoginPage;

//nav section
//login screen
// footer section

// same as pipe email password
