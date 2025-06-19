import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DownOutlined, SolutionOutlined } from "@ant-design/icons";
import { Modal, Input, Button, Dropdown, Space } from "antd";
import "./landing.css";
import SignUp from "./SignUpMod";
import { loginCall } from "../utils/methods/auth";
import LoginModal from "./LoginModal";
import { getItemUserAuth, logoutUser,getUrl } from "../utils/methods/methods";
import { EmailContext } from "./context/emailContext";

const Navbar = () => {
  const dataBaseUrl =getUrl();
  const [isOpen, setIsOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isModalUser, setIsModalUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const { username } = getItemUserAuth();
  useEffect(() => {
   
    setName(username);
    username ? setIsModalUser(true) : setIsModalUser(false);
  }, [username]);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false); 
  const items = [
    {
      label: (
        <a
          href="https://www.antgroup.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          My Profile
        </a>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a
          href="#"
          onClick={(e)=>{
           e.preventDefault();

           window.location.href= dataBaseUrl
          }}
        >
          My Database
        </a>
      ),
      key: "1",
    },
  ];
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
            <>
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Features
              </Link>
            </>
            
              <Link to="/price"className="text-gray-700 hover:text-blue-600">
                Pricing
              
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
                  <Link to={"/register"}>Try for free</Link>
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
                <Space>
                  {" "}
                  <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    paddingBlock={10}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        {/* Profile Icon */}
                        <Space>
                          <SolutionOutlined />
                          <div
                            className="text-gray-700 usernameBtn mt-auto mb-auto cursor-pointer
               hover:text-blue-600 overflow-hidden text-ellipsis whitespace-nowrap "
                          >{`Hi, ${name}`}</div>
                        </Space>
                        <Space>
                          <DownOutlined />
                        </Space>
                      </Space>
                    </a>
                  </Dropdown>
                </Space>

                <button
                  className="btnPrimary text-white px-4 py-2 ml-2 cursor-pointer hover:bg-blue-600"
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
