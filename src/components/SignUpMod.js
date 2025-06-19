import React, { useState } from "react";
import { Button, Modal } from "antd";
import "../App.css";
import Stepper from "./Stepper";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    mobileNumber: "",
    emailId: "",
    password: "",
    companyName: "",
    companySize: "",
    language: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setIsOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
 
  return (
    <div className="flex  justify-center items-center containersign">
      {
        <div className=" bg-opacity-50 flex justify-center items-center">
          {/* <Modal open={isModalOpen} closable={false} footer={null}> */}
            <div className="p-6 rounded-3xl ">
              
              <Stepper className="m-3 p-[20px]" connect={"Let's Connect"} />
              {/* <p className="text-sm mt-4">
                Already have an account?
                <p onClick={()=> navigate('/')} className="text-blue-500">
                  Login
                </p>
              </p> */}
            </div>
          {/* </Modal> */}
        </div>
      }
    </div>
  );
};

export default SignUp;
