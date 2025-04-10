import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import "../App.css"
import Stepper from './Stepper';

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
 
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    mobileNumber: '',
    emailId: '',
    password: '',
    companyName: '',
    companySize:'',
    language:''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
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
        
        <div className="modalBox modalcolor bg-opacity-50 flex justify-center items-center">
        <Modal open={isModalOpen}  closable={false} footer={null}>
          <div className="p-6 rounded-3xl ">
            
            <h2 className="text-2xl mb-4 font-bold">Let's Connect</h2>
            <Stepper className="m-3"/>

          </div>
          </Modal> 
        </div>
        
        
      }
    </div>
  );
};

export default SignUp;
