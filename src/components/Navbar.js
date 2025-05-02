import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Modal, Input, Button } from "antd";
import "./landing.css";
import SignUp from "./SignUpMod";
import { loginCall } from "../utils/methods/auth";
import LoginModal from "./LoginModal";
import { getItemUserAuth, logoutUser } from "../utils/methods/methods";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isModalUser, setIsModalUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const { username } = getItemUserAuth();

    setName(username);
    username ? setIsModalUser(true) : setIsModalUser(false);
  }, []);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const logoutCase = () => {
    setIsModalUser(false);
    logoutUser();
  };
  const onLoginBtnClick = async (e) => {
    e.preventDefault();
    loginCall({
      emailId: email,
      password: password,
    })
      .then((res) => {
        if (res) {
        }
      })
      .catch((err) => console.warn(err.message));

    setIsModalOpen(false);
  };

  return (
    <nav className="bg-white shadow-md top-0  fixed w-full z-[999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-900">Rivvra</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Features
              </a>
            </Link>
            <Link to="/price">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Pricing
              </a>
            </Link>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Resources
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Contact
            </a>
          </div>

          {/* Right-side Buttons */}
          <div className="hidden md:flex space-x-4 bg-gray-200 pl-5 rounded-3xl hover:z-50 cursor-pointer">
            {isModalUser === false ? (
              <>
                <button
                  className="text-gray-700  cursor-pointer hover:text-blue-600 "
                  onClick={showModal}
                >
                  Try for free
                </button>

                {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Sign Up
              
            </button> */}
                {/* <SignUp/> */}

                <Link to="/login">
                <button
                  // onClick={() => setIsOpen(true)}
                  onClick={showModal}
                  className="btnPrimary text-white px-4 py-2  cursor-pointer hover:bg-blue-600"
                >
                  Log In
                </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center ">
                <div
                  className="text-gray-700 usernameBtn mt-auto mb-auto cursor-pointer
               hover:text-blue-600 overflow-hidden text-ellipsis whitespace-nowrap "
                >{`Hi, ${name}`}</div>
                <button
                  className="btnPrimary text-white px-4 py-2  cursor-pointer hover:bg-blue-600"
                  onClick={logoutCase}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button will work later*/}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu will work later */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-2">
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Features
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Pricing
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Resources
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Contact
          </a>
          <button className="block w-full text-left text-gray-700 hover:text-blue-600">
            Login
          </button>
          <button className="block w-full text-left cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
