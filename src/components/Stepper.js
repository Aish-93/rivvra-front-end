import React, { useState, useEffect, useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { TfiStatsUp } from "react-icons/tfi";
import { GoGoal } from "react-icons/go";
import {
  Form,
  Input,
  Button,
  Steps,
  Select,
  Checkbox,
  message,
  InputNumber,
} from "antd";

import axios from "axios";
import "./Stepper.css";
import { loginCall } from "../utils/methods/auth";
import { setItem, setPass, getItemUserAuth,setUrl } from "../utils/methods/methods";
import { API_URL } from "../constants/constant";
import { EmailContext } from "./context/emailContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const { Step } = Steps;
const { Option } = Select;
const job = [
  "CEO",
  "CTO",
  "Developer",
  "SalesPerson",
  "Manger",
  "Business Owner",
  "Designer",
  "Sperviser",
  "Executive",
];
const language = ["English", "Hindi"];
const Stepper = ({connect}) => {
  const navigate = useNavigate();
  const {
    email,
    name,
    lastName,
    isLocalLogin,
    setIsLocalLogin,
    googleId,
    setGoogleId,
    googleToken,
    setGoogleToken,
    setDataBaseUrl
  } = useContext(EmailContext);
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: name + " " + lastName,
      googleId: googleId,
    }));
  }, [email, name, lastName]);
  
  const [formData, setFormData] = useState({
    emailId: email, // using context for email
    name: name + " " + lastName,
    password: "",
    country: [], // will be array as using list to select and from api fetch
    role: undefined,
    crmCheck: undefined,
    companyName: "",
    companySize: undefined,
    numberOfPeople: 0,
    phone: "",
    goals: [],
    language: undefined,
    authProvider: googleId !== "" ? "google" : "local",
  });

  const [selectedCountryOpt, setSelectedCountryOtp] = useState(null);

  // useEffect(() => {
  //   // Simulate API call to fetch existing user data
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${API_URL}profile`);
  //       form.setFieldsValue(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [form]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const countriesOption = res.data
          .map((item) => ({
            label: item.name.common,
            value: item.cca2,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        
        setSelectedCountryOtp(countriesOption);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onFinish = async (values) => {
    
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}signup`, formData);
      setPass(formData.password);

      if (response.data.message == "SignUp Successfull") {
        message.success("SignUp successful!");
        // const {password} = getItemUserAuth()
        if (response.data.data.authProvider === "local") {
          
          const resLogin = loginCall({
            emailId: email,
            password: formData.password,
          });
          resLogin.then((res) => {
            if (res.message === "Login Successfull") {
              setItem(res);
              navigate("/");
              if (res.url) {
                setUrl(res.url)
                window.location.href = res.url;
              }
            }
          });
        } else if (response.data.data.authProvider !== "local") {
          // make login via google login api
         

          try {
            const res = await axios.post(
              `${API_URL}google-login`,
              { token: googleToken },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );

            let value = { data: res.data.data.name };

            setItem(value); // can add firstname and lastname also

            navigate("/");
            if (res.data.data.url) {
              setUrl(res.data.data.url)
              window.location.href = res.data.data.url;
            }
            setLoading(false);
          } catch (err) {
            console.error(err.message);
          }
        }
      }
    } catch (error) {
      console.error("API Error:", error.message);
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCheckboxChange = (checkedValues) => {
    
    setFormData((prev) => ({
      ...prev,
      goals: checkedValues,
    }));
  };

  
  const steps = [
    {
      title: "About you",
      icon: <CgProfile />,
      content: (
        <div className="max-h-[480px] overflow-y-auto custom-scroll">
          <div className="headers">
            <h1 className="head">About you</h1>
            <p>We'll use this information to tailor Rivvra to your needs.</p>
          </div>
          {/* <Form> */}
          <Form.Item
            label="Your Name"
            className="text-slate-800 text-sm font-medium mb-2"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter your Name"
              value={formData.name}
              className="inputback w-full h-10 text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent  outline-blue-500 transition-all"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Form.Item>
          {isLocalLogin && (
            <Form.Item
              label="Password"
              rules={[{ required: true }]}
              className="text-slate-800 text-sm font-medium mb-2 block"
            >
              <Input.Password
                value={formData.password}
                classNames="inputback"
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </Form.Item>
          )}
          <Form.Item
            label="Mobile Number"
            className="text-slate-800 text-sm font-medium mb-2 block"
            rules={[
              { required: true, message: "Mobile number is required" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit mobile number",
              }, // Validates 10 digits
            ]}
          >
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter your mobile number"
              maxLength={10}
              className="inputback !w-full !text-slate-800 !text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            />
          </Form.Item>
          <Form.Item
            label="Language"
            className="text-slate-800 text-sm font-medium mb-2 block"
            rules={[{ required: true }]}
            placeholder="Enter your language"
          >
            <Select
              value={formData.language}
              onChange={(value) => handleChange("language", value)}
              placeholder="Enter your language"
              popupClassName="inputback"
              className="inputback w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            >
              {language.map((item) => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Job"
            className="text-slate-800 text-sm 
            overflow-y-visible
            font-medium mb-2 block"
            rules={[{ required: true }]}
          >
            <Select
              value={formData.role}
              onChange={(value) => handleChange("role", value)}
              placeholder="Which job title describes you role best?"
              popupClassName="inputback"
              className="inputback w-full text-slate-800 overflow-y-visible
              text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            >
              {job.map((item) => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Have you used CRM before?"
            className="text-slate-800 text-sm font-medium mb-2 block"
            rules={[{ required: true }]}
          >
            <Select
              value={formData.crmCheck}
              className="inputback w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              onChange={(value) => handleChange("crmCheck", value)}
              popupClassName="inputback"
              placeholder="Select a option"
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
          {/* </Form> */}
        </div>
      ),
    },
    {
      title: "Your company",
      icon: <TfiStatsUp />,
      content: (
        <>
          <div className="headers">
            <h1 className="head">About your company</h1>
            <p>We'll use this information to tailor Rivvra to your needs.</p>
          </div>
          <Form.Item
            label="Company Name"
            rules={[{ required: true }]}
            className="text-slate-800 text-sm font-medium mb-2 block"
          >
            <Input
              value={formData.companyName}
              className="inputback test w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Company Size"
            rules={[{ required: true }]}
            className="text-slate-800 text-sm font-medium mb-2 block"
          >
            <Select
              value={formData.companySize}
              onChange={(value) => handleChange("companySize", value)}
              placeholder="Select company size"
              popupClassName="inputback"
              className="inputback w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            >
              <Option value="small">Small (1-10 employees)</Option>
              <Option value="medium">Medium (11-50 employees)</Option>
              <Option value="large">Large (51+ employees)</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Country"
            rules={[{ required: true }]}
            className="text-slate-800 text-sm font-medium mb-2 block"
          >
            <Select
              showSearch
              placeholder="Select country"
              options={selectedCountryOpt}
              popupClassName="inputback"
              value={formData.country}
              className="inputback w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              onChange={(value) => handleChange("country", value)}
              filterOption={(input, option) => {
                return option.label
                  .toLowerCase()
                  .includes(input.toLocaleLowerCase());
              }}
              onSearch={(value) => {
                if (!value) handleChange("country", undefined);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Number of People"
            rules={[{ required: true, type: "number", min: 1 }]}
            className="text-slate-800 text-sm font-medium mb-2 block"
          >
            <InputNumber
              value={formData.numberOfPeople}
              className="inputback w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              onChange={(value) => handleChange("numberOfPeople", value)}
              min={1}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Your goals",
      icon: <GoGoal />,
      content: (
        <>
          <div className="headers">
            <h1 className="head">About your goals </h1>
            <p>We'll use this information to tailor Rivvra to your needs.</p>
          </div>
          <Form.Item
            className="text-slate-800 text-sm font-medium mb-2 block"
            label="What would like to focus on during the trail?"
          >
            <Checkbox.Group
              className="flex flex-col "
              value={formData.goals}
              onChange={handleCheckboxChange}
            >
              <div className="boxyourgoal hover:bg-blue-100 shadow-2xs">
                <Checkbox value="freeTrial">Free Trial</Checkbox>
              </div>
              <div className="boxyourgoal hover:bg-blue-100 shadow-2xs">
                {" "}
                <Checkbox value="getCRM">Get CRM</Checkbox>
              </div>
              <div className="boxyourgoal hover:bg-blue-100 shadow-2xs">
                {" "}
                <Checkbox value="getSales">Get Sales</Checkbox>
              </div>
              <div className="boxyourgoal hover:bg-blue-100 shadow-2xs">
                {" "}
                <Checkbox value="getLeads">Get Leads</Checkbox>
              </div>
            </Checkbox.Group>
          </Form.Item>
        </>
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  const next = () => {
    setCurrent(current + 1);
  };
  return (
    <div className=" w-[600px]">
      {loading ? (
        // <ShimmerPostDetails
        //   className="h-[700px] w-[600px]"
        //   card
        //   cta
        //   variant="EDITOR"
        //   //  postStyle="STYLE_FOUR" col={1} row={1} width={600}
        // />
        <div className=" w-[600px] h-[400px] mt-[200px]" >
        <Loader/>
        </div>

      ) : (
        <div>
          <h1 className="text-2xl mb-4 font-bold">{connect}</h1>
        
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="border-blue-500 px-[20px] border-2 mt-[100]  my-12 rounded-2xl h-[700px] flex justify-center align-middle ml-auto mr-auto flex-col w-[600px]"
        >
          <Steps current={current}>
            {steps.map((step, index) => (
              <Step key={index} title={step.title} icon={step.icon} />
            ))}
          </Steps>
          <div className="my-4 min-h-80">{steps[current].content}</div>
          <div className="flex justify-between mt-32">
            {current > 0 && (
              <Button onClick={() => setCurrent(current - 1)}>Previous</Button>
            )}
            {current < steps.length - 1 && current >= 0 && (
              <Button onClick={() => setCurrent(current + 1)}>Next</Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" htmlType="submit">
                Sign up
              </Button>
            )}
          </div>
        </Form>
        </div>
      )}
    </div>
  );
};
export default Stepper;
