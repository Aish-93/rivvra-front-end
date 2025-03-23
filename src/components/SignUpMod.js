import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import "../App.css"

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
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
    <div className="flex  justify-center items-center">
      <button
        // onClick={() => setIsOpen(true)}
        onClick={showModal}
        className="btnPrimary text-white px-4 py-2 hover:bg-blue-600"
      >
      Signup
      </button>

     

      {
        <>
        <Modal title="Let's Connect" className='modalBox' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        >

        <div className=" modalBox modalcolor bg-opacity-50 flex justify-center items-center">
          <div className="p-6 rounded-3xl ">
            <h2 className="text-2xl mb-4">Signup Form</h2>
            

              {
            <form onSubmit={handleSubmit} className="space-y-4 ">
              
              <div >
            {Object.keys(formData).map((field) => (
              ['companySize', 'language'].includes(field) ? (
               
               <div className='mainBox'> 
                <select
                  key={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-96 p-2 m-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  required
                >
                  <option value="">{field.charAt(0).toUpperCase() + field.slice(1)}</option>
                  {field === 'companySize' && (
                    <>
                      <option value="small">Small (1-10 employees)</option>
                      <option value="medium">Medium (11-50 employees)</option>
                      <option value="large">Large (51+ employees)</option>
                    </>
                  )}
                  {field === 'language' && (
                    <>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                    </>
                  )}
                </select>
                </div>
              ) : (
                <input
                  key={field}
                  type={field === 'password' ? 'password' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className=" w-96 p-2 m-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  required
                />
              )
            ))}
            </div>
            
          </form>}

          {

            <form onSubmit={handleSubmit}>
              <div className='mainBox'>
                {/* <input placeholder='Name' type={text} name={"name"} value ={e.target.value}/> */}
              </div>

            </form>
          }
          </div>
        </div>
        </Modal>
        </>
      }
    </div>
  );
};

export default SignUp;
