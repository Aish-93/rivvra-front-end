import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Steps, Select, Checkbox, message } from "antd";
import { TiTick } from "react-icons/ti";
import { CiMail } from "react-icons/ci";
import { Link, useNavigate } from "react-router";
import { EmailContext } from "./context/emailContext";
import LoginGoogle from "./LoginGoogle";
import Otp from "./Otp";

const Register = () => {
  
  const { setEmail,setName,setLastName,email } = useContext(EmailContext);

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [emailId, setEmailId] = useState("");
  const [message, setMessage] = useState("");

  // useEffect(()=>{

  //    setEmailId(email);
    
  // },[emailId])
  
  const sendOtp = async () => {
    console.log("sendOtp clicked");
    // setEmail(emailId);
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}send-otp`, { email });
      if (response.data.success) {
        setIsOtpSent(true);
        setMessage("Otp sent to your mail!!!");
      } else {
        setMessage("Failed to send Otp!!!");
      }
    } catch (err) {
      setMessage("error sending Otp please try again !!! " + err.message);
    }
    setLoading(false);
  };

  const handlGoogleApi =(value) =>{
    setEmail(value);
    // setEmailId(value)
console.log("callback", value)
  }

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}verify-otp`, {
        email,
        otp,
      });
      if (response.data.success) {
        setMessage("OTP Verified! Redirecting...");
        setEmail(emailId); // adding emailid to context to signup page
        setCurrent(current + 1);
        // Redirect user to next step or dashboard
      } else {
        setMessage("Invalid OTP. Try again.");
      }
    } catch (error) {
      setMessage("Error verifying OTP.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="border-blue-500 border-2 mt-[100] px-5 my-5 rounded-2xl h-[630px] flex justify-evenly align-middle ml-auto mr-auto flex-col w-[750px] ">
        <div>
          <h1 className="text-3xl text-green-900 font-bold w-[550] p-3 flex justify-center text-center mr-auto ml-auto">
            Start closing more deals with Rivvra - get 14 days on us!
          </h1>
          <div className="flex flex-row justify-center  py-2">
            <p className="flex flex-row align-middle px-2">
              {" "}
              <TiTick />A CRM by salespeople, for salespeople{" "}
            </p>
            <p className="flex flex-row px-2">
              {" "}
              <TiTick /> Easy to customize and organize
            </p>
          </div>
          <p className="text-base w-[550] text-center mr-auto ml-auto pb-4">
            Start with access to Rivvra CRM plus the premium LeadBooster, Smart
            Docs and Projects Features (subject to supplemental terms). Your
            Plan and Feature access can be changed at any time.
          </p>
          <p className="text-base font-bold bg-green-100 text-green-800 w-[340px] ml-auto mr-auto text-center rounded-xl">
            {" "}
            100% access. No credit card required
          </p>
        </div>
        <h2 className="text-xl font-bold text-center mb-3 ">
          {isOtpSent ? "Enter OTP" : "Verify Your Email"}
        </h2>
        {!isOtpSent ? (
          <div className="w-[600px] mr-auto ml-auto">
            <Form.Item
              name="email"
              //   label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input
                type="email"
                className="!text-xl"
                value={email}
                prefix={<CiMail className="scale-120 accent-blue-600" />}
                onChange={(e) => setEmail(e.target.value)}
                
                placeholder="Enter your work email"
              />
            </Form.Item>
            <div>
              <div className=" flex justify-items-start m-3 ml-2">
                <input type="checkbox" className="scale-150 accent-blue-600" />
                <div className=" ml-5">
                  {"By Signing up, you accept our "}
                  <a className="text-blue-500">Terms of service</a> and{" "}
                  <a className="text-blue-500">privacy policy</a>{" "}
                </div>
              </div>
              <div className=" flex justify-items-start m-3 ml-2">
                <input type="checkbox" className="scale-150 accent-blue-600" />
                <div className=" ml-5">
                  {
                    "Get helpful tips, product updates and exclusive offers via email"
                  }
                </div>
              </div>
              <Link to="/signup">
                <button
                  onClick={sendOtp}
                  className="w-full bg-blue-500 text-white py-2 rounded-md scale-110 hover:bg-blue-600"
                >
                  Sign up in two minutes
                </button>
              </Link>
              {/* below code will be used after sms integration  */}
              {/* <button
                    onClick={sendOtp}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Sent Otp"}
                  </button> */}
              <div className="flex flex-row py-4">
                <p>Already have an account ? </p>
                <Link to="/login" className="text-blue-950 font-boldbold">
                  {" "}
                  Log in
                </Link>
              </div>
              <div>
                <LoginGoogle  
                handlGoogleApi={handlGoogleApi}
                 />
              </div>
            </div>
          </div>
        ) : (
          <div>
           
            <div className="p-2 mb-10 ">
            <Otp handleFullOtp={setOtp}/>
            </div>
            <button
              onClick={verifyOtp}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
              disabled={loading}
            >
              <Link to="/signup">
                {" "}
                {loading ? "Verifying..." : "Verify Otp"}
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
