import React, { useContext, useState } from "react";
import axios from "axios";
import { Modal, Input, Button } from "antd";
import { Link } from "react-router";
import LoginGoogle from "./LoginGoogle";
import { IoIosMail,IoMdLock  } from "react-icons/io";


import { loginCall } from "../utils/methods/auth";
import { setItem, getItemUserAuth ,setUrl} from "../utils/methods/methods";
import { EmailContext } from "./context/emailContext";

const LoginModal = () => {
  const {setDataBaseUrl} = useContext(EmailContext)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginBtnClick = async (e) => {
    e.preventDefault();

    console.log(email, password, "test");

    const response = loginCall({
      emailId: email,
      password: password,
    });

    response.then((res) => {
      console.log(res);

      if (res.message === "success") {
        
        setIsModalOpen(false);
        if (res.redirectUrl) {
           setUrl(data.redirectUrl)
          window.location.href = data.redirectUrl;
        }
      }
    });

    //     try{
    //        const response = await axios.post(`${API_URL}login`,{
    //         emailId:email,
    //         password:password
    //        });

    //       console.log(response,"response");

    //       if(response.status === 200){

    //       }
    //     }catch(err){
    //       console.warn(err.message)
    // // antd noti
    //       setIsModalOpen(false)
    //     }

    console.log(getItemUserAuth());
  };

  const handleAccount = () => {
    setIsModalOpen(false);
  };
  console.log(window.location,"test")
  return (
    <div className="flex  justify-center items-center">
      <Link to="/login">
        {" "}
        <button
          // onClick={() => setIsOpen(true)}
          onClick={showModal}
          className="btnPrimary text-white px-4 py-2  cursor-pointer hover:bg-blue-600"
        >
          Log In
        </button>
      </Link>
      {
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          className="glass-modal "
        >
          <div className="p-6 flex flex-col items-center mt-14">
            <h2 className="text-2xl font-bold text-black mb-4">Log In</h2>

            <label className="flex min-w-full pb-1 ml-1">Email</label>
        
            <Input
              prefix={<IoIosMail className="text-gray-500" />}
              className=" p-3 rounded-lg bg-transparent margininput border border-white text-black"
              placeholder="Email"
              value={email}
              
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="flex min-w-full pb-1 ml-1 ">Password</label>
            <Input.Password
               prefix={<IoMdLock className="text-gray-500" /> }
              className="mb-3 p-3 rounded-lg bg-transparent border border-white text-black"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex min-w-full forgotBox font-bold justify-end cursor-pointer">
              Forgot Password ?{" "}
            </div>

            <Button
              type="primary"
              className="w-full cursor-pointer signInbg  hover:bg-blue-700 mt-2"
              onClick={onLoginBtnClick}
            >
              Log In
            </Button>
            <Link to="/signup">
              <div className=" p-2 cursor-pointer" onClick={handleAccount}>
                Don't have an account?
              </div>
            </Link>
            <div>
              <LoginGoogle />
            </div>
          </div>
        </Modal>
      }
    </div>
  );
};

export default LoginModal;
